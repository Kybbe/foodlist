<template>
  <div class="admin-stats">
    <h2>Recipe Stats & Admin</h2>

    <div
      v-if="validationReport.issues.length"
      class="validation-banner"
      role="alert"
    >
      <div class="validation-banner__title">
        Data integrity issues found ({{ validationReport.issues.length }})
      </div>

      <div class="validation-banner__actions">
        <Button
          v-if="validationReport.hasRecipeIdIssues"
          :disabled="fixing"
          @click="fixRecipeIds"
          label="Fix recipe IDs"
          class="validation-fix-btn"
        />
        <Button
          v-if="validationReport.hasIngredientIdIssues"
          :disabled="fixing"
          @click="fixIngredientIds"
          label="Fix ingredient IDs"
          class="validation-fix-btn"
        />
        <Button
          v-if="validationReport.hasInstructionIdIssues"
          :disabled="fixing"
          @click="fixInstructionIds"
          label="Fix instruction IDs"
          class="validation-fix-btn"
        />
        <Button
          :disabled="fixing"
          @click="fixAll"
          label="Fix all"
          class="validation-fix-btn validation-fix-btn--all"
        />
      </div>

      <ul class="validation-banner__list">
        <li v-for="(issue, idx) in validationReport.issues" :key="idx">
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
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AdminRecipeStats",
  components: { Button },
  data() {
    return {
      recipes: [],
      loading: true,
      fixing: false,
    };
  },
  computed: {
    validationReport() {
      const issues = [];
      const recipes = Array.isArray(this.recipes) ? this.recipes : [];

      const report = {
        issues,
        hasRecipeIdIssues: false,
        hasIngredientIdIssues: false,
        hasInstructionIdIssues: false,
      };

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
          report.hasRecipeIdIssues = true;
          continue;
        }
        if (idInt < 0) {
          issues.push(
            `Recipe has negative recipeId (${rawId}) (dbKey: ${recipe?._key || "unknown"})`
          );
          report.hasRecipeIdIssues = true;
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
        report.hasRecipeIdIssues = true;
      }

      const duplicateRecipeIds = [...recipeIdCounts.entries()]
        .filter(([, count]) => count > 1)
        .map(([id, count]) => `${id} (x${count})`)
        .sort((a, b) => Number(a.split(" ")[0]) - Number(b.split(" ")[0]));
      if (duplicateRecipeIds.length) {
        issues.push(`Duplicate recipeIds: ${duplicateRecipeIds.join(", ")}`);
        report.hasRecipeIdIssues = true;
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
          report.hasRecipeIdIssues = true;
        }

        // Helpful summary when IDs drift from the common 0..(n-1) pattern
        const expectedMax = Math.max(0, recipes.length - 1);
        if (minId !== 0) {
          issues.push(`RecipeIds start at ${minId} (expected 0).`);
          report.hasRecipeIdIssues = true;
        }
        if (maxId > expectedMax) {
          issues.push(
            `Highest recipeId is ${maxId}, but there are only ${recipes.length} recipes (expected max ${expectedMax}).`
          );
          report.hasRecipeIdIssues = true;
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
          report.hasIngredientIdIssues = true;
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
            report.hasIngredientIdIssues = true;
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
            report.hasInstructionIdIssues = true;
          }
        }

        if (missingInstructionIdIndices.length) {
          issues.push(
            `Instructions missing id in ${recipeLabel} (indexes: ${missingInstructionIdIndices.join(", ")})`
          );
          report.hasInstructionIdIssues = true;
        }
        if (nonNumericInstructionIdIndices.length) {
          issues.push(
            `Instructions with non-numeric id in ${recipeLabel} (indexes: ${nonNumericInstructionIdIndices.join(", ")})`
          );
          report.hasInstructionIdIssues = true;
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
          report.hasInstructionIdIssues = true;
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
            report.hasInstructionIdIssues = true;
          }

          const extras = uniqueSortedInstructionIds.filter(
            (id) => !expectedSet.has(id)
          );
          if (extras.length) {
            issues.push(
              `Instruction ids out of expected range in ${recipeLabel}: ${extras.join(", ")}`
            );
            report.hasInstructionIdIssues = true;
          }
        }
      }

      return report;
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
          // Sort by recipeId for visibility (db push order isn't helpful for admin)
          arr.sort((a, b) => Number(a?.recipeId) - Number(b?.recipeId));
          this.recipes = arr;
          this.loading = false;
        });
    },

    async fixRecipeIds() {
      this.fixing = true;
      try {
        const db = firebase.database();
        const recipesRef = db.ref("recipes");
        const snapshot = await recipesRef.once("value");

        const list = [];
        snapshot.forEach((child) => {
          list.push({ _key: child.key, ...(child.val() || {}) });
        });

        list.sort((a, b) => {
          const aId = Number(a?.recipeId);
          const bId = Number(b?.recipeId);
          const aHas = Number.isFinite(aId);
          const bHas = Number.isFinite(bId);
          if (aHas && bHas) return aId - bId;
          if (aHas && !bHas) return -1;
          if (!aHas && bHas) return 1;
          return String(a?._key || "").localeCompare(String(b?._key || ""));
        });

        const updates = {};
        list.forEach((recipe, index) => {
          if (!recipe?._key) return;
          updates[`recipes/${recipe._key}/recipeId`] = index;
        });

        await db.ref().update(updates);

        // Verify: ids must be exactly 0..n-1
        const verifySnap = await recipesRef.once("value");
        const ids = [];
        verifySnap.forEach((child) => {
          ids.push(Number(child.val()?.recipeId));
        });
        ids.sort((a, b) => a - b);
        for (let i = 0; i < ids.length; i++) {
          if (ids[i] !== i) {
            throw new Error(
              `Fix recipe IDs verification failed: expected ${i}, got ${ids[i]}`
            );
          }
        }

        this.$toast?.add?.({
          severity: "success",
          summary: "Fixed recipe IDs",
          detail: "Reindexed all recipeIds to be consecutive.",
          life: 5000,
        });
      } catch (err) {
        console.error(err);
        this.$toast?.add?.({
          severity: "error",
          summary: "Fix failed",
          detail: err?.message || "Failed fixing recipe IDs.",
          life: 7000,
        });
      } finally {
        this.fixing = false;
        this.fetchRecipes();
      }
    },

    async fixIngredientIds() {
      this.fixing = true;
      try {
        const db = firebase.database();
        const recipesRef = db.ref("recipes");
        const snapshot = await recipesRef.once("value");
        const updates = {};
        let changedRecipes = 0;

        snapshot.forEach((child) => {
          const key = child.key;
          const recipe = child.val() || {};
          const ingredients = Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [];

          const seen = new Set();
          let changed = false;

          for (const ing of ingredients) {
            const currentId = ing?.id;
            const normalized =
              currentId === undefined || currentId === null || currentId === ""
                ? ""
                : String(currentId);

            if (!normalized || seen.has(normalized)) {
              ing.id = uuidv4();
              changed = true;
            }
            seen.add(String(ing.id));
          }

          if (changed) {
            updates[`recipes/${key}/ingredients`] = ingredients;
            changedRecipes++;
          }
        });

        if (Object.keys(updates).length) {
          await db.ref().update(updates);
        }

        this.$toast?.add?.({
          severity: "success",
          summary: "Fixed ingredient IDs",
          detail: `Repaired ingredient ids in ${changedRecipes} recipe(s).`,
          life: 5000,
        });
      } catch (err) {
        console.error(err);
        this.$toast?.add?.({
          severity: "error",
          summary: "Fix failed",
          detail: err?.message || "Failed fixing ingredient IDs.",
          life: 7000,
        });
      } finally {
        this.fixing = false;
        this.fetchRecipes();
      }
    },

    async fixInstructionIds() {
      this.fixing = true;
      try {
        const db = firebase.database();
        const recipesRef = db.ref("recipes");
        const snapshot = await recipesRef.once("value");
        const updates = {};
        let changedRecipes = 0;

        snapshot.forEach((child) => {
          const key = child.key;
          const recipe = child.val() || {};
          const instructions = Array.isArray(recipe.instructions)
            ? recipe.instructions
            : [];

          let changed = false;
          const fixed = instructions.map((inst, idx) => {
            if (!inst || inst.id !== idx) changed = true;
            return { ...(inst || {}), id: idx };
          });

          if (changed) {
            updates[`recipes/${key}/instructions`] = fixed;
            changedRecipes++;
          }
        });

        if (Object.keys(updates).length) {
          await db.ref().update(updates);
        }

        this.$toast?.add?.({
          severity: "success",
          summary: "Fixed instruction IDs",
          detail: `Reindexed instruction ids in ${changedRecipes} recipe(s).`,
          life: 5000,
        });
      } catch (err) {
        console.error(err);
        this.$toast?.add?.({
          severity: "error",
          summary: "Fix failed",
          detail: err?.message || "Failed fixing instruction IDs.",
          life: 7000,
        });
      } finally {
        this.fixing = false;
        this.fetchRecipes();
      }
    },

    async fixAll() {
      this.fixing = true;
      try {
        const db = firebase.database();
        const recipesRef = db.ref("recipes");
        const snapshot = await recipesRef.once("value");

        const list = [];
        snapshot.forEach((child) => {
          list.push({ _key: child.key, ...(child.val() || {}) });
        });

        list.sort((a, b) => {
          const aId = Number(a?.recipeId);
          const bId = Number(b?.recipeId);
          const aHas = Number.isFinite(aId);
          const bHas = Number.isFinite(bId);
          if (aHas && bHas) return aId - bId;
          if (aHas && !bHas) return -1;
          if (!aHas && bHas) return 1;
          return String(a?._key || "").localeCompare(String(b?._key || ""));
        });

        const updates = {};
        list.forEach((recipe, index) => {
          if (!recipe?._key) return;

          // Fix recipeId
          updates[`recipes/${recipe._key}/recipeId`] = index;

          // Fix ingredient ids (missing / duplicates)
          const ingredients = Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [];
          const seen = new Set();
          let ingredientsChanged = false;
          for (const ing of ingredients) {
            const currentId = ing?.id;
            const normalized =
              currentId === undefined || currentId === null || currentId === ""
                ? ""
                : String(currentId);
            if (!normalized || seen.has(normalized)) {
              ing.id = uuidv4();
              ingredientsChanged = true;
            }
            seen.add(String(ing.id));
          }
          if (ingredientsChanged) {
            updates[`recipes/${recipe._key}/ingredients`] = ingredients;
          }

          // Fix instruction ids (0..n-1)
          const instructions = Array.isArray(recipe.instructions)
            ? recipe.instructions
            : [];
          let instructionsChanged = false;
          const fixedInstructions = instructions.map((inst, idx) => {
            if (!inst || inst.id !== idx) instructionsChanged = true;
            return { ...(inst || {}), id: idx };
          });
          if (instructionsChanged) {
            updates[`recipes/${recipe._key}/instructions`] = fixedInstructions;
          }
        });

        await db.ref().update(updates);

        // Verify recipeIds are exactly 0..n-1
        const verifySnap = await recipesRef.once("value");
        const ids = [];
        verifySnap.forEach((child) => ids.push(Number(child.val()?.recipeId)));
        ids.sort((a, b) => a - b);
        for (let i = 0; i < ids.length; i++) {
          if (ids[i] !== i) {
            throw new Error(
              `Fix all verification failed: expected recipeId ${i}, got ${ids[i]}`
            );
          }
        }

        this.$toast?.add?.({
          severity: "success",
          summary: "Fixed all issues",
          detail: "Reindexed recipe IDs and repaired ingredient/instruction IDs.",
          life: 6000,
        });
      } catch (err) {
        console.error(err);
        this.$toast?.add?.({
          severity: "error",
          summary: "Fix failed",
          detail: err?.message || "Failed fixing issues.",
          life: 7000,
        });
      } finally {
        this.fixing = false;
        this.fetchRecipes();
      }
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

      this.loading = true;
      this.$store
        .dispatch("deleteRecipeAndReindex", id)
        .then(() => {
          this.$toast?.add?.({
            severity: "success",
            summary: "Recipe deleted",
            detail: `Recipe ${id} deleted and reindexed successfully.`,
            life: 4000,
          });
          this.fetchRecipes();
        })
        .catch((err) => {
          console.error("Failed deleting recipe", err);
          this.$toast?.add?.({
            severity: "error",
            summary: "Delete failed",
            detail: err?.message || "Failed deleting recipe.",
            life: 6000,
          });
          this.loading = false;
        });
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

.validation-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 10px 0;
}

.validation-fix-btn {
  background-color: #e74c3c;
  border: none;
}

.validation-fix-btn:hover {
  background-color: #c0392b;
}

.validation-fix-btn--all {
  background-color: #8e44ad;
}

.validation-fix-btn--all:hover {
  background-color: #6c3483;
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
