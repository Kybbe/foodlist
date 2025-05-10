<template>
  <div>
    <form action="" id="container">
      <input type="text" name="title" id="title" placeholder="title" />
      <label for="drink">drink? :</label>
      <input type="checkbox" name="drink" id="drink" />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="description"
      />
      <input type="text" name="imgLink" id="imgLink" placeholder="imgLink" />
      <div id="labels">
        <label for="amount" style="flex: 0.25">Quantity:</label>
        <label for="ingredientUnit" style="flex: 0.25">Unit:</label>
        <label for="ingredientName" style="flex: 0.65">Ingredient Name:</label>
        <label for="ingredientSection" style="flex: 0.25">Section:</label>
      </div>
      <div id="ingredientsList"></div>
      <div id="ingredientsButtons">
        <button type="button" v-on:click="addIngredient">Add Ingredient</button>
        <button
          type="button"
          v-on:click="removeIngredient"
          v-if="moreThanOneIngredient"
        >
          Remove Ingredient
        </button>
      </div>
      <div id="labels">
        <label for="checked" style="flex: 0.25">Checked:</label>
        <label for="id" style="flex: 0.25">Id:</label>
        <label for="name" style="flex: 0.8">Instruction:</label>
      </div>
      <div id="instructionsList"></div>
      <div id="instructionsButtons">
        <button type="button" v-on:click="addInstruction">
          Add Instruction
        </button>
        <button
          type="button"
          v-on:click="removeInstruction"
          v-if="moreThanOneInstruction"
        >
          Remove Instruction
        </button>
      </div>
      <input type="text" name="servings" id="servings" placeholder="servings" />
      <input type="text" name="link" id="link" placeholder="link" />
      <button
        v-on:click.prevent="editFirebase"
        type="submit"
        id="updateRecipeBtn"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AutoCompletingIngredientInput from "../components/autoCompletingIngredientInput.vue";

export default {
	name: "edit-recipe",
	components: {
		AutoCompletingIngredientInput,
	},
	data() {
		return {
			moreThanOneIngredient: false,
			moreThanOneInstruction: false,
		};
	},
	methods: {
		addIngredient() {
			const ingredientTemplate = document
				.getElementsByClassName("editIngredients")[0]
				.cloneNode(true);

			for (let i = 0; i < ingredientTemplate.length; i++) {
				ingredientTemplate.querySelector("input").value = "";
			}

			// set value of all inputs in ingredientTemplate to empty string
			document
				.getElementsByClassName("editIngredients")[0]
				.parentNode.appendChild(ingredientTemplate);

			this.moreThanOneIngredient = true;
		},
		removeIngredient() {
			const ingredients = document.getElementsByClassName("editIngredients");
			if (ingredients.length > 1) {
				ingredients[ingredients.length - 1].remove();
			}
			if (ingredients.length === 1) {
				this.moreThanOneIngredient = false;
			}
		},
		addInstruction() {
			const list = document.getElementById("instructionsList");

			const newInstruction = list.children[list.children.length - 1]; // get the bar where we input text (bottom one)

			list.insertBefore(newInstruction.cloneNode(true), newInstruction); // add the new ingredient to the top of the list

			const instructionInputs = newInstruction.getElementsByTagName("input");
			for (let i = 0; i < instructionInputs.length; i++) {
				//for all inputs in ingredientInputs, set value as ""
				instructionInputs[i].value = "";
			}

			this.moreThanOneInstruction = true;
		},
		removeInstruction() {
			const instructions = document.getElementsByClassName("editInstructions");
			if (instructions.length > 1) {
				instructions[instructions.length - 1].remove();
			}
			if (instructions.length === 1) {
				this.moreThanOneInstruction = false;
			}
		},
		editFirebase() {
			if (!this.$store.state.admin) {
				return;
			}

			const db = firebase.database();
			const database = firebase.database().ref("recipes");
			const dbKeys = [];

			database.on("value", (snapshot) => {
				for (const childSnapshot of snapshot) {
					dbKeys.push(childSnapshot.key);
				}
			});

			const recipeFirebase = db.ref(`recipes/${dbKeys[this.$route.params.id]}`);

			const title = document.getElementById("title").value;
			const drink = document.getElementById("drink").checked;
			const description = document.getElementById("description").value;
			const ingredients = [];
			const ingredientsGroups =
				document.getElementsByClassName("editIngredients");
			for (let i = 0; i < ingredientsGroups.length; i++) {
				const ingredient = {
					amount: ingredientsGroups[i].querySelectorAll("input")[0].value,
					measurment: ingredientsGroups[i].querySelectorAll("input")[1].value,
					name: ingredientsGroups[i].querySelectorAll("input")[2].value,
					section: ingredientsGroups[i].querySelectorAll("input")[3].value,
				};
				ingredients.push(ingredient);
			}
			const instructions = [];
			const instructionsGroups =
				document.getElementsByClassName("editInstructions");
			for (let i = 0; i < instructionsGroups.length; i++) {
				const instruction = {
					checked: instructionsGroups[i].querySelectorAll("input")[0].value,
					id: instructionsGroups[i].querySelectorAll("input")[1].value,
					text: instructionsGroups[i].querySelectorAll("input")[2].value,
				};
				if (instruction.checked === "true") {
					instruction.checked = true;
				}
				if (instruction.checked === "false") {
					instruction.checked = false;
				}
				instructions.push(instruction);
			}
			const servings = document.getElementById("servings").value;
			const link = document.getElementById("link").value;
			const imgLink = document.getElementById("imgLink").value;
			let recipeId = this.$route.params.id;
			recipeId = Number.parseInt(recipeId);
			const recipeData = {
				title: title,
				drink: drink,
				description: description,
				ingredients: ingredients,
				instructions: instructions,
				servings: servings,
				link: link,
				imgLink: imgLink,
				recipeId: recipeId,
			};
			recipeFirebase.update(recipeData);
			alert("Recipe updated!");
			this.$router.push(`/recipe/${this.$route.params.id}`);
		},
		putRecipeDetailsInInputs() {
			document.getElementById("title").value = this.currentRecipe.title;
			document.getElementById("description").value =
				this.currentRecipe.description;
			document.getElementById("imgLink").value = this.currentRecipe.imgLink;

			if (this.currentRecipe.drink) {
				document.getElementById("drink").checked = true;
			}

			const ingredients = this.currentRecipe.ingredients;
			if (ingredients.length > 1) {
				this.moreThanOneIngredient = true;
			}
			for (let i = 0; i < ingredients.length; i++) {
				const ingredient = ingredients[i];
				const amount = ingredient.amount;
				const measurment = ingredient.measurment;
				const name = ingredient.name;
				const section = ingredient.section;
				const newIngredient = document.createElement("div");
				newIngredient.classList.add("editIngredients");
				newIngredient.innerHTML = `
					<input type="text" name="amount" class="amount" value="${amount}" />
					<input type="text" name="measurment" class="measurment" value="${measurment}" />
					<autoCompletingIngredientInput placeholder="Tomatoes" value="${name}" />
          <input type="text" name="section" class="section" value="${section}" />
				`;
				document.getElementById("ingredientsList").appendChild(newIngredient);
			}

			const instructions = this.currentRecipe.instructions;
			if (instructions.length > 1) {
				this.moreThanOneInstruction = true;
			}
			for (let i = 0; i < instructions.length; i++) {
				const instruction = instructions[i];
				const checked = instruction.checked;
				const id = instruction.id;
				const text = instruction.text;
				const newInstruction = document.createElement("div");
				newInstruction.classList.add("editInstructions");
				newInstruction.innerHTML = `
					<input type="text" name="checked" class="checked" value="${checked}">
					<input type="number" name="id" class="id" value="${id}">
					<input type="text" name="text" class="text" value="${text}">
				`;
				document.getElementById("instructionsList").appendChild(newInstruction);
			}

			document.getElementById("servings").value = this.currentRecipe.servings;
			document.getElementById("link").value = this.currentRecipe.link;
		},
	},
	mounted() {
		this.putRecipeDetailsInInputs();
	},
	computed: {
		currentRecipe() {
			return this.$store.state.recipesList[this.$route.params.id];
		},
	},
};
</script>

<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
  scroll-behavior: smooth;
}

#container * {
  box-sizing: border-box;
}

#container {
  margin: 20px auto;
  padding: 10px;
  max-width: 500px;
}

#container input {
  display: block;
  width: 100%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 4px;
  margin-bottom: 10px;
}

#drink {
  display: inline-block !important;
  width: unset !important;
}

#ingredientsList,
#instructionsList {
  background-color: #cbf3ff;
  padding: 10px;
}

#ingredientsButtons,
#instructionsButtons {
  display: flex;
  justify-content: space-between;
  background-color: #cbf3ff;
  padding: 10px;
  padding-top: 0px;
  margin-bottom: 10px;
}

#ingredientsButtons button,
#instructionsButtons button {
  display: block;
  background-color: #4a8ee7;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.editInstructions,
.editIngredients {
  display: flex;
  flex-direction: row;

  .amount,
  .checked,
  .id,
  .section,
  .measurment {
    width: 25% !important;
  }
}

#updateRecipeBtn {
  display: block;
  margin: 0 auto;
  background-color: #4a8ee7;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background-color: #3a7dd6;
  }
}

#labels {
  display: flex;
  flex-direction: row;
  margin: 10px 0;

  label {
    flex: 1;
  }
}
</style>
