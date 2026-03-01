<template>
  <div class="admin-stats">
    <h2>Recipe Stats & Admin</h2>

    <div v-if="validationIssues.length" class="validation-banner" role="alert">
      <div class="validation-banner__title">
        Data integrity issues found ({{ validationIssues.length }})
      </div>
      <ul class="validation-banner__list">
        <li v-for="(issue, idx) in validationIssues" :key="idx">
          {{ issue }}
        </li>
      </ul>
    </div>

    <div class="admin-actions">
      <Button
        @click="goToMigration"
        label="Migrate Ingredient IDs"
        class="migration-link-btn"
      />
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p><strong>Total Recipes:</strong> {{ recipes.length }}</p>
      <table class="stats-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>dbKey</th>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe._key || recipe.recipeId">
            <td>
              <a
                :href="`#/recipe/${recipe.recipeId}`"
                style="
                  color: #1e74e4;
                  text-decoration: underline;
                  cursor: pointer;
                "
                >{{ recipe.recipeId }}</a
              >
            </td>
            <td>
              <a
                :href="`#/recipe/${recipe.recipeId}`"
                style="
                  color: #1e74e4;
                  text-decoration: underline;
                  cursor: pointer;
                "
                >{{ recipe._key }}</a
              >
            </td>
            <td>
              <a
                :href="`#/recipe/${recipe.recipeId}`"
                style="
                  color: #1e74e4;
                  text-decoration: underline;
                  cursor: pointer;
                "
                >{{ recipe.title }}</a
              >
            </td>
            <td>{{ Array.isArray(recipe.ingredients) ? recipe.ingredients.length : 0 }}</td>
            <td>{{ Array.isArray(recipe.instructions) ? recipe.instructions.length : 0 }}</td>
            <td>
              <Button @click="editRecipe(recipe.recipeId)" label="Edit" />
            </td>
            <td>
              <Button
                @click="deleteRecipe(recipe.recipeId)"
                label="Delete"
                class="delete-btn"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { Button } from "primevue";

export default {
  name: "AdminRecipeStats",
  components: { Button },
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  computed: {
    validationIssues() {
      const issues = [];
      const recipes = Array.isArray(this.recipes) ? this.recipes : [];

      // --- Recipe ID checks (missing, duplicates, gaps/out-of-order)
      const numericIds = [];
      const recipeIdCounts = new Map();
      const recipesMissingId = [];

      for (const recipe of recipes) {
        const rawId = recipe?.recipeId;
        const idNum = Number(rawId);
        const idIsValidNumber = Number.isFinite(idNum);

        if (rawId === undefined || rawId === null || rawId === "" || !idIsValidNumber) {
          recipesMissingId.push(recipe?._key || recipe?.title || "(unknown recipe)");
          continue;
        }

        const idInt = Math.trunc(idNum);
        if (idInt !== idNum) {
          issues.push(
            `Recipe has non-integer recipeId (${rawId}) (dbKey: ${recipe?._key || "unknown"})`
          );
          continue;
        }
        if (idInt < 0) {
          issues.push(
            `Recipe has negative recipeId (${rawId}) (dbKey: ${recipe?._key || "unknown"})`
          );
          continue;
        }

        numericIds.push(idInt);
        recipeIdCounts.set(idInt, (recipeIdCounts.get(idInt) || 0) + 1);
      }

      if (recipesMissingId.length) {
        issues.push(
          `Recipes missing recipeId: ${recipesMissingId.slice(0, 10).join(", ")}${
            recipesMissingId.length > 10 ? ` (+${recipesMissingId.length - 10} more)` : ""
          }`
        );
      }

      const duplicateRecipeIds = [...recipeIdCounts.entries()]
        .filter(([, count]) => count > 1)
        .map(([id, count]) => `${id} (x${count})`)
        .sort((a, b) => Number(a.split(" ")[0]) - Number(b.split(" ")[0]));
      if (duplicateRecipeIds.length) {
        issues.push(`Duplicate recipeIds: ${duplicateRecipeIds.join(", ")}`);
      }

      const uniqueSortedIds = [...new Set(numericIds)].sort((a, b) => a - b);
      if (uniqueSortedIds.length) {
        const minId = uniqueSortedIds[0];
        const maxId = uniqueSortedIds[uniqueSortedIds.length - 1];

        // Detect gaps like 35, 37, 38...
        const missingIds = [];
        for (let i = 0; i < uniqueSortedIds.length - 1; i++) {
          const current = uniqueSortedIds[i];
          const next = uniqueSortedIds[i + 1];
          if (next !== current + 1) {
            for (let m = current + 1; m < next; m++) missingIds.push(m);
          }
        }
        if (missingIds.length) {
          issues.push(
            `Missing recipeIds in sequence: ${missingIds.slice(0, 25).join(", ")}${
              missingIds.length > 25 ? ` (+${missingIds.length - 25} more)` : ""
            }`
          );
        }

        // Helpful summary when IDs drift from the common 0..(n-1) pattern
        const expectedMax = Math.max(0, recipes.length - 1);
        if (minId !== 0) {
          issues.push(`RecipeIds start at ${minId} (expected 0).`);
        }
        if (maxId > expectedMax) {
          issues.push(
            `Highest recipeId is ${maxId}, but there are only ${recipes.length} recipes (expected max ${expectedMax}).`
          );
        }
      }

      // --- Ingredient ID checks (per recipe)
      for (const recipe of recipes) {
        const recipeLabel = recipe?.recipeId !== undefined ? `recipeId ${recipe.recipeId}` : `dbKey ${recipe?._key || "unknown"}`;
        const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];

        const ingredientIds = [];
        const missingIngredientIdIndices = [];
        for (let i = 0; i < ingredients.length; i++) {
          const ing = ingredients[i];
          const ingId = ing?.id;
          if (ingId === undefined || ingId === null || ingId === "") {
            missingIngredientIdIndices.push(i);
          } else {
            ingredientIds.push(String(ingId));
          }
        }

        if (missingIngredientIdIndices.length) {
          issues.push(
            `Ingredients missing id in ${recipeLabel} (indexes: ${missingIngredientIdIndices.join(", ")})`
          );
        }

        if (ingredientIds.length) {
          const counts = ingredientIds.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          }, {});
          const dupes = Object.entries(counts)
            .filter(([, count]) => count > 1)
            .map(([id, count]) => `${id} (x${count})`);
          if (dupes.length) {
            issues.push(`Duplicate ingredient ids in ${recipeLabel}: ${dupes.join(", ")}`);
          }
        }
      }

      // --- Instruction ID checks (per recipe)
      for (const recipe of recipes) {
        const recipeLabel = recipe?.recipeId !== undefined ? `recipeId ${recipe.recipeId}` : `dbKey ${recipe?._key || "unknown"}`;
        const instructions = Array.isArray(recipe?.instructions) ? recipe.instructions : [];

        const numericInstructionIds = [];
        const missingInstructionIdIndices = [];
        const nonNumericInstructionIdIndices = [];

        for (let i = 0; i < instructions.length; i++) {
          const inst = instructions[i];
          const rawId = inst?.id;
          if (rawId === undefined || rawId === null || rawId === "") {
            missingInstructionIdIndices.push(i);
            continue;
          }
          const idNum = Number(rawId);
          if (!Number.isFinite(idNum)) {
            nonNumericInstructionIdIndices.push(i);
            continue;
          }
          numericInstructionIds.push(Math.trunc(idNum));
          if (Math.trunc(idNum) !== idNum) {
            issues.push(
              `Instruction has non-integer id (${rawId}) in ${recipeLabel} (index ${i})`
            );
          }
        }

        if (missingInstructionIdIndices.length) {
          issues.push(
            `Instructions missing id in ${recipeLabel} (indexes: ${missingInstructionIdIndices.join(", ")})`
          );
        }
        if (nonNumericInstructionIdIndices.length) {
          issues.push(
            `Instructions with non-numeric id in ${recipeLabel} (indexes: ${nonNumericInstructionIdIndices.join(", ")})`
          );
        }

        // Duplicates
        const instructionIdCounts = numericInstructionIds.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});
        const duplicateInstructionIds = Object.entries(instructionIdCounts)
          .filter(([, count]) => count > 1)
          .map(([id, count]) => `${id} (x${count})`)
          .sort((a, b) => Number(a.split(" ")[0]) - Number(b.split(" ")[0]));
        if (duplicateInstructionIds.length) {
          issues.push(
            `Duplicate instruction ids in ${recipeLabel}: ${duplicateInstructionIds.join(", ")}`
          );
        }

        // Order / gaps: expect 0..(n-1)
        const uniqueSortedInstructionIds = [...new Set(numericInstructionIds)].sort(
          (a, b) => a - b
        );
        if (uniqueSortedInstructionIds.length) {
          const expected = Array.from(
            { length: instructions.length },
            (_, idx) => idx
          );
          const expectedSet = new Set(expected);
          const actualSet = new Set(uniqueSortedInstructionIds);

          const missing = expected.filter((id) => !actualSet.has(id));
          if (missing.length) {
            issues.push(
              `Instruction ids out of order / missing in ${recipeLabel}: missing ${missing.join(", ")}`
            );
          }

          const extras = uniqueSortedInstructionIds.filter(
            (id) => !expectedSet.has(id)
          );
          if (extras.length) {
            issues.push(
              `Instruction ids out of expected range in ${recipeLabel}: ${extras.join(", ")}`
            );
          }
        }
      }

      return issues;
    },
  },
  methods: {
    checkAccess() {
      if (!this.$store.state.currentUser) {
        console.warn(
          "⚠️ Unauthorized access attempt to /stats: User is not authenticated"
        );
        this.$router.push("/");
        return false;
      }
      if (!this.$store.state.admin) {
        console.warn(
          "⚠️ Unauthorized access attempt to /stats: User is authenticated but not an admin"
        );
        this.$router.push("/");
        return false;
      }
      return true;
    },
    fetchRecipes() {
      firebase
        .database()
        .ref("recipes")
        .once("value", (snapshot) => {
          const arr = [];
          snapshot.forEach((child) => {
            arr.push({ ...child.val(), _key: child.key });
          });
          this.recipes = arr;
          this.loading = false;
        });
    },
    editRecipe(id) {
      this.$router.push(`/edit/${id}`);
    },
    goToMigration() {
      this.$router.push("/migrate-ingredients");
    },
    deleteRecipe(id) {
      if (!confirm("Are you sure you want to delete recipe " + id + "?"))
        return;
      // Find the firebase key for this recipeId
      const recipe = this.recipes.find((r) => r.recipeId == id);
      if (recipe && recipe._key) {
        firebase
          .database()
          .ref(`recipes/${recipe._key}`)
          .remove()
          .then(() => {
            this.fetchRecipes();
          });
      }
    },
  },
  mounted() {
    if (!this.checkAccess()) {
      return;
    }
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.admin-stats {
  max-width: 900px;
  margin: 30px auto;
  background: #f5faff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 8px rgba(128, 128, 128, 0.1);
}

.validation-banner {
  margin: 12px 0 18px 0;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e74c3c;
  background: #fff2f0;
  color: #7a1d13;
}

.validation-banner__title {
  font-weight: 700;
  margin-bottom: 8px;
}

.validation-banner__list {
  margin: 0;
  padding-left: 18px;
}

.admin-actions {
  margin-bottom: 20px;
  text-align: center;
}
.migration-link-btn {
  background-color: #f39c12;
  color: white;
  font-size: 1em;
  padding: 10px 20px;
}
.migration-link-btn:hover {
  background-color: #e67e22;
}
.stats-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.stats-table th,
.stats-table td {
  border: 1px solid #4a8ee7;
  padding: 8px;
  text-align: center;
}
.stats-table th {
  background: #e7f3ff;
}
.delete-btn {
  background: #e74c3c;
  color: white;
}
.delete-btn:hover {
  background: #c0392b;
}
</style>
