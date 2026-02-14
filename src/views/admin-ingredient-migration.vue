<template>
  <div class="migration-page">
    <h2>Ingredient ID Migration</h2>
    <div class="info-box">
      <p>
        This page will add unique IDs to all ingredients in all recipes in the
        database. This is required for proper portion scaling when recipes have
        multiple ingredients with the same name.
      </p>
      <p>
        <strong>Warning:</strong> This operation will modify all recipes in the
        database.
      </p>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading recipes...</p>
    </div>

    <div v-if="!loading && !migrationComplete">
      <div class="stats">
        <p><strong>Total Recipes:</strong> {{ totalRecipes }}</p>
        <p>
          <strong>Recipes without ingredient IDs:</strong>
          {{ recipesNeedingMigration }}
        </p>
        <p><strong>Recipes already migrated:</strong> {{ recipesMigrated }}</p>
      </div>

      <Button
        v-if="recipesNeedingMigration > 0"
        @click="startMigration"
        label="Start Migration"
        :disabled="migrating"
        class="migration-btn"
      />
      <p v-else class="success-message">
        All recipes already have ingredient IDs!
      </p>
    </div>

    <div v-if="migrating" class="progress">
      <p>
        Migrating recipes... {{ migratedCount }} / {{ recipesToMigrate.length }}
      </p>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <div v-if="migrationComplete" class="success">
      <h3>✓ Migration Complete!</h3>
      <p>Successfully migrated {{ migratedCount }} recipes.</p>
      <div v-if="errors.length > 0" class="errors">
        <h4>Errors:</h4>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <Button @click="goToStats" label="Back to Stats" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { Button } from "primevue";

export default {
  name: "AdminIngredientMigration",
  components: { Button },
  data() {
    return {
      recipes: [],
      loading: true,
      migrating: false,
      migrationComplete: false,
      migratedCount: 0,
      recipesToMigrate: [],
      errors: [],
    };
  },
  computed: {
    totalRecipes() {
      return this.recipes.length;
    },
    recipesNeedingMigration() {
      return this.recipes.filter((recipe) => {
        if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
          return false;
        }
        // Check if any ingredient is missing an id
        return recipe.ingredients.some(
          (ingredient) => ingredient.id === undefined || ingredient.id === null
        );
      }).length;
    },
    recipesMigrated() {
      return this.totalRecipes - this.recipesNeedingMigration;
    },
    progressPercentage() {
      if (this.recipesToMigrate.length === 0) return 0;
      return (this.migratedCount / this.recipesToMigrate.length) * 100;
    },
  },
  methods: {
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
    async startMigration() {
      this.migrating = true;
      this.migratedCount = 0;
      this.errors = [];

      // Find all recipes that need migration
      this.recipesToMigrate = this.recipes.filter((recipe) => {
        if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) {
          return false;
        }
        return recipe.ingredients.some(
          (ingredient) => ingredient.id === undefined || ingredient.id === null
        );
      });

      // Migrate each recipe
      for (const recipe of this.recipesToMigrate) {
        try {
          await this.migrateRecipe(recipe);
          this.migratedCount++;
        } catch (error) {
          this.errors.push(
            `Failed to migrate recipe "${recipe.title}" (ID: ${recipe.recipeId}): ${error.message}`
          );
          console.error("Migration error:", error);
        }
      }

      this.migrating = false;
      this.migrationComplete = true;

      if (this.errors.length === 0) {
        this.$toast.add({
          severity: "success",
          summary: "Migration Complete",
          detail: `Successfully migrated ${this.migratedCount} recipes!`,
          life: 5000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Migration Complete with Errors",
          detail: `Migrated ${this.migratedCount} recipes with ${this.errors.length} errors.`,
          life: 5000,
        });
      }
    },
    async migrateRecipe(recipe) {
      // Add IDs to ingredients that don't have them
      const updatedIngredients = recipe.ingredients.map((ingredient, index) => {
        if (ingredient.id === undefined || ingredient.id === null) {
          return { ...ingredient, id: index };
        }
        return ingredient;
      });

      // Update the recipe in Firebase
      await firebase
        .database()
        .ref(`recipes/${recipe._key}`)
        .update({ ingredients: updatedIngredients });
    },
    goToStats() {
      this.$router.push("/stats");
    },
  },
  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.migration-page {
  max-width: 800px;
  margin: 30px auto;
  background: #f5faff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 8px rgba(128, 128, 128, 0.1);
}

.info-box {
  background: #e7f3ff;
  border: 1px solid #4a8ee7;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
}

.info-box p {
  margin: 10px 0;
}

.stats {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #ddd;
}

.stats p {
  margin: 10px 0;
}

.migration-btn {
  background-color: #4a8ee7;
  color: white;
  font-size: 1.1em;
  padding: 10px 20px;
  margin: 20px 0;
}

.migration-btn:hover {
  background-color: #3a6bb7;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #4a8ee7;
}

.progress {
  margin: 30px 0;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background-color: #4a8ee7;
  transition: width 0.3s ease;
}

.success {
  text-align: center;
  padding: 30px;
}

.success h3 {
  color: #2ecc71;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.success-message {
  color: #2ecc71;
  font-weight: bold;
  font-size: 1.1em;
  margin: 20px 0;
}

.errors {
  background: #ffe7e7;
  border: 1px solid #e74c3c;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  text-align: left;
}

.errors h4 {
  color: #e74c3c;
  margin-top: 0;
}

.errors ul {
  margin: 10px 0;
  padding-left: 20px;
}

.errors li {
  margin: 5px 0;
  color: #c0392b;
}
</style>
