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
        <ingredients :ingredients="this.currentRecipe.ingredients" />
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
import mainArea from "../components/mainArea.vue";
import instruction from "../components/instructions.vue";
import ingredients from "../components/ingredients.vue";
import firebase from "firebase/app";
import "firebase/database";

import { useStore } from "vuex";

export default {
	name: "recipePage",
	components: {
		mainArea,
		instruction,
		ingredients,
	},
	methods: {
		deleteRecipe() {
			const dbKeys = [];
			const database = firebase.database().ref("recipes");

			database.on("value", (snapshot) => {
				for (const childSnapshot of snapshot.val()) {
					dbKeys.push(childSnapshot.key);
				}
			});

			database.child(dbKeys[this.currentRecipeId]).remove();
			alert("Recipe deleted!");

			// get id of all database entries and update their recipeIds
			database.on("value", (snapshot) => {
				const updates = [];
				for (const childSnapshot of snapshot.val()) {
					if (childSnapshot.recipeId > this.currentRecipeId) {
						updates.push(
							database.child(childSnapshot.key).update({
								recipeId: childSnapshot.recipeId - 1,
							}),
						);
					}
				}
				Promise.all(updates);
			});

			if (dbKeys.length === 1) {
				//should still be 1 even if database has 0 entries after deletion
				const templateRecipe = {
					title: "Add a recipe",
					description:
						"Since this database shouldn't be empty, you should add a recipe!",
					recipeId: "0",
					ingredients: [
						{
							amount: "2",
							unit: "Large",
							name: "OOF's",
						},
					],
					instructions: [
						{
							checked: false,
							id: "0",
							text: "Add a recipe",
						},
					],
					servings: "4",
					link: "foodlist-0921.web.app/#/add",
					imgLink: "",
				};
				database.push(templateRecipe);
			}

			this.$router.push("/");
		},
		confirmDelete() {
			if (
				confirm(
					"Are you sure you want to delete this recipe? \r\nThis action cannot be undone.",
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

#delete {
  background-color: orange;
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
