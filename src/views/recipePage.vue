<template>
  <div>
    <div id="content">
      <div
        class="bigCard card"
        style="
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          padding: 0px;
        "
      >
        <mainArea
          :title="this.currentRecipe.title"
          :description="this.currentRecipe.description"
          :imgLink="this.currentRecipe.imgLink"
          :drink="this.currentRecipe.drink"
        />
      </div>

      <div class="mediumCard card">
        <ingredients
          :ingredients="this.currentRecipe.ingredients"
          :portions="this.currentRecipe.servings"
        />
      </div>

      <div class="mediumCard card">
        <instruction :instructions="this.currentRecipe.instructions" />
      </div>
    </div>
    <div id="footer">
      <a
        v-if="this.currentRecipe.link"
        :href="this.currentRecipe.link"
        target="_blank"
        id="ogLink"
        >Original Recipe</a
      >
      <router-link
        id="edit"
        :to="'/edit/' + this.currentRecipeId"
        v-if="this.$store.state.admin"
      >
        Edit this recipe
      </router-link>
      <button id="delete" @click="confirmDelete" v-if="this.$store.state.admin">
        Delete this recipe
      </button>
    </div>
  </div>
</template>

<script>
import ingredients from "../components/ingredients.vue";
import instruction from "../components/instructions.vue";
import mainArea from "../components/mainArea.vue";

import { useStore } from "vuex";

export default {
  name: "recipePage",
  components: {
    mainArea,
    instruction,
    ingredients,
  },
  methods: {
    async deleteRecipe() {
      try {
        await this.$store.dispatch("deleteRecipeAndReindex", this.currentRecipeId);
        this.$toast.add({
          severity: "success",
          summary: "Recipe deleted",
          detail: "Recipe deleted and IDs reindexed successfully!",
          life: 5000,
        });
        this.$router.push("/");
      } catch (err) {
        console.error("Delete failed", err);
        this.$toast.add({
          severity: "error",
          summary: "Delete failed",
          detail: err?.message || "Could not delete recipe.",
          life: 6000,
        });
      }
    },
    confirmDelete() {
      if (
        confirm(
          "Are you sure you want to delete this recipe? \r\nThis action cannot be undone."
        )
      ) {
        this.deleteRecipe();
      }
    },
  },
  computed: {
    currentRecipeId() {
      return this.$route.params.id;
    },
    currentRecipe() {
      return this.$store.state.recipesList[this.currentRecipeId];
    },
    store() {
      return useStore();
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

#content {
  display: flex;
  flex-wrap: wrap;

  max-width: 75em;
  margin: 0 auto;
}

.card {
  padding: 10px;
  width: 100%;
  margin: 7px auto 7px auto;
}

.mediumCard {
  background-color: rgba(0, 0, 0, 0.01);
}

#footer {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  margin-bottom: 30px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
}

#ogLink,
#delete,
#edit {
  text-decoration: none;
  color: white;
  background-color: #4a8ee7;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
  border: none;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin: 0px 20px 10px 20px;

  &:hover {
    background-color: #386baf;
    box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.4);
  }

  @media (min-width: 600px) {
    margin: 0px !important;
  }
}

#edit {
  background-color: orange;
  &:hover {
    background-color: #e07b00;
  }
}

#delete {
  background-color: #ff4d4d;
  &:hover {
    background-color: red;
  }
}

@media (min-width: 800px) {
  #content {
    padding: 10px;
  }

  .card {
    border-radius: 10px;
    background-color: white;
    border: solid rgb(192, 192, 192) 1px;
    height: 100%;
  }

  .bigCard {
    width: 100%;
  }

  .mediumCard {
    width: calc(50% - 10px);
    margin: 7px 0px;
  }

  .mediumCard:nth-child(2n) {
    margin-right: 20px;
  }

  .smallCard {
    width: 32%;
  }
}
</style>
