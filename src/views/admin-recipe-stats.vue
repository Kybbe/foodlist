<template>
  <div class="admin-stats">
    <h2>Recipe Stats & Admin</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p><strong>Total Recipes:</strong> {{ recipes.length }}</p>
      <p v-if="nonConsecutiveIds.length">
        <strong>Non-consecutive Recipe IDs:</strong>
        {{ nonConsecutiveIds.join(", ") }}
      </p>
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
          <tr v-for="recipe in recipes" :key="recipe.recipeId">
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
            <td>{{ recipe.ingredients.length }}</td>
            <td>{{ recipe.instructions.length }}</td>
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
    nonConsecutiveIds() {
      const ids = this.recipes
        .map((r) => Number(r.recipeId))
        .sort((a, b) => a - b);
      const missing = [];
      for (let i = 0; i < ids.length - 1; i++) {
        if (ids[i + 1] !== ids[i] + 1) {
          missing.push(ids[i] + 1);
        }
      }
      return missing;
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
    editRecipe(id) {
      this.$router.push(`/edit/${id}`);
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
