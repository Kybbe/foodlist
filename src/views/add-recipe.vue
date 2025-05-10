<template>
  <div style="display: flex">
    <div id="draft" v-if="draft.length != 0">
      <ul>
        <li v-for="input in draft" :key="input.name">
          <p>{{ input }}</p>
        </li>
      </ul>
      <button v-on:click="putBackDraft">Input draft!</button>
      <button style="background-color: red" v-on:click="removeDraft">
        Remove draft!
      </button>
    </div>

    <div id="addRecipe">
      <h2>Add Recipe</h2>
      <form action="">
        <div class="form-group">
          <label for="recipeName">Recipe Name / Title:</label>
          <input
            type="text"
            class="form-control"
            id="recipeName"
            placeholder="Tomatoes and Cheese Pasta"
            v-model="recipe.title"
            required
          />
        </div>
        <div class="form-group">
          <label for="drink" style="display: inline-block">Drink? :</label>
          <input
            type="checkbox"
            name="drink"
            id="drink"
            v-model="recipe.drink"
          />
        </div>
        <div class="form-group">
          <label for="recipeDescription">Recipe Description:</label>
          <textarea
            class="form-control"
            id="recipeDescription"
            rows="3"
            v-model="recipe.description"
            placeholder="A simple recipe for a tasty pasta dish with tomatoes and cheese."
          ></textarea>
        </div>
        <div class="form-group">
          <label for="recipeIngredients">Recipe Ingredients:</label>
          <div id="labels">
            <label for="amount">Quantity:</label>
            <label for="ingredientUnit">Unit:</label>
            <label for="ingredientName">Ingredient Name:</label>
            <label for="ingredientSection">Section?:</label>
          </div>
          <div id="ingredientsList">
            <div class="ingredients">
              <input
                type="number"
                placeholder="2"
                name="amount"
                class="amount"
              />
              <input type="text" placeholder="Large" name="measurment" />
							<AutoCompletingIngredientInput
								placeholder="Tomatoes"
								v-on:change="fixIngredients"
								required
							/>
              <input
                type="text"
                placeholder="Salad"
                name="section"
              />
            </div>
          </div>
          <button type="button" v-on:click="addIngredient">
            Add Ingredient
          </button>
          <button
            type="button"
            v-on:click="removeIngredient"
            v-if="moreThanOneIngredient"
          >
            Remove Ingredient
          </button>
        </div>
        <div class="form-group">
          <label for="recipeServings">Recipe Servings:</label>
          <input
            type="number"
            class="form-control"
            id="recipeServings"
            placeholder="4"
            v-model="recipe.servings"
            v-on:change="checkServings"
          />
        </div>
        <div class="form-group">
          <label for="recipeInstructions">Recipe Instructions: </label>
          <div id="labels">
            <label for="id" style="flex: 0.25">Id:</label>
            <label for="checked" style="flex: 0.25">Checked:</label>
            <label for="text" style="flex: 0.8">Instruction:</label>
          </div>
          <div id="instructionsList">
            <div class="instructions">
              <input
                type="number"
                placeholder="1"
                name="id"
                style="width: 25%"
              />
              <input
                type="text"
                placeholder="false"
                name="checked"
                style="width: 25%"
              />
              <input
                type="text"
                placeholder="1. Preheat oven to 350 degrees."
                name="text"
                v-on:change="fixInstructions"
                required
                style="width: 90%"
              />
            </div>
          </div>
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
        <div class="form-group">
          <label for="recipeImage">Original Recipe Link:</label>
          <input
            type="text"
            class="form-control"
            id="recipeImage"
            placeholder="www.example.com/recipe.html"
            v-model="recipe.link"
          />
        </div>
        <div class="form-group">
          <label for="recipeImage">Recipe Image (Link):</label>
          <input
            type="text"
            class="form-control"
            id="recipeImage"
            placeholder="www.google.com(images/recipe.jpg)"
            v-model="recipe.imgLink"
          />
        </div>
        <button v-on:click.prevent="post" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AutoCompletingIngredientInput from "../components/autoCompletingIngredientInput.vue";

export default {
	name: "AddRecipe",
	components: {
		AutoCompletingIngredientInput,
	},
	data() {
		return {
			recipe: {
				recipeId: "",
				drink: false,
				title: "",
				description: "",
				ingredients: [],
				instructions: [],
				servings: "",
				link: "",
				imgLink: "",
			},
			moreThanOneIngredient: false,
			moreThanOneInstruction: false,
			draft: [],
		};
	},
	methods: {
		addIngredient() {
			const list = document.getElementById("ingredientsList");

			const newIngredient = list.children[list.children.length - 1]; // get the bar where we input text (bottom one)

			list.insertBefore(newIngredient.cloneNode(true), newIngredient); // add the new ingredient to the top of the list

			const ingredientInputs = newIngredient.getElementsByTagName("input");
			for (let i = 0; i < ingredientInputs.length; i++) {
				//for all inputs in ingredientInputs, set value as ""
				ingredientInputs[i].value = "";
			}

			this.moreThanOneIngredient = true;
		},
		removeIngredient() {
			const ingredients = document.getElementsByClassName("ingredients");
			if (ingredients.length > 1) {
				ingredients[ingredients.length - 1].remove();
			}
			if (ingredients.length === 1) {
				this.moreThanOneIngredient = false;
			}
		},
		fixIngredients() {
			const ingredients = [];
			const ingredientsGroups = document.getElementsByClassName("ingredients");
			for (let i = 0; i < ingredientsGroups.length; i++) {
				const ingredient = {};
				const inputs = ingredientsGroups[i].querySelectorAll("input");
				for (let j = 0; j < inputs.length; j++) {
					ingredient[inputs[j].name] = inputs[j].value;
				}
				ingredients.push(ingredient);
			}
			this.recipe.ingredients = ingredients;
			this.checkServings();
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
			const instructions = document.getElementsByClassName("instructions");
			if (instructions.length > 1) {
				instructions[instructions.length - 1].remove();
			}
			if (instructions.length === 1) {
				this.moreThanOneInstruction = false;
			}
		},
		fixInstructions() {
			const instructionsGroups =
				document.getElementsByClassName("instructions");
			for (let i = 0; i < instructionsGroups.length; i++) {
				const inputs = instructionsGroups[i].querySelectorAll("input");
				for (let j = 0; j < inputs.length; j++) {
					if (inputs[0].value === "") {
						// if inputs[0].value is empty, then add the id of current position to the id of the instruction
						inputs[0].value = i;
					} else if (inputs[1].value === "") {
						// if inputs[1].value is empty, then add false to the checked of the instruction
						inputs[1].value = false;
					}
				}
				this.populateInstruction();
			}
		},
		populateInstruction() {
			const instructions = [];
			const instructionsGroups =
				document.getElementsByClassName("instructions");
			for (let i = 0; i < instructionsGroups.length; i++) {
				const instruction = {};
				const inputs = instructionsGroups[i].querySelectorAll("input");
				for (let j = 0; j < inputs.length; j++) {
					if (inputs[1].value === "true") {
						instruction[inputs[1].name] = true;
					} else if (inputs[1].value === "false") {
						instruction[inputs[1].name] = false;
					}
					instruction[inputs[j].name] = inputs[j].value;
				}
				instructions.push(instruction);
			}
			this.recipe.instructions = instructions;
		},
		checkServings() {
			// servings is 4 by default,
			// if user inputs a number, it will be the number
			// if users number is less or more than 4, divide all ingredient amounts by input and multiply by 4.
			const servings = document.getElementById("recipeServings").value;
			if (servings === "") {
				return;
			}
			if (servings) {
				if (document.getElementsByClassName("amount")[0].value === "") {
					return;
				}
				const ingredients = this.recipe.ingredients;
				const amounts = document.getElementsByClassName("amount");
				for (let i = 0; i < ingredients.length; i++) {
					if (amounts[i].value === "") {
						return;
					}
					const oneServing = ingredients[i].amount / servings;
					let fourServings = oneServing * 4;
					fourServings = Number(fourServings.toFixed(1));
					ingredients[i].amount = fourServings;
					amounts[i].value = fourServings;
				}
				this.recipe.ingredients = ingredients;
			}
		},
		post() {
			if (this.recipe.title === "Test JKL") {
				this.testPost();
				this.$router.push("/");
				return;
			}

			if (
				this.recipe.title === "" ||
				this.recipe.description === "" ||
				this.recipe.ingredients === "" ||
				this.recipe.instructions === "" ||
				this.recipe.link === ""
			) {
				alert("Please fill out all fields");
				return;
			}

			this.addRecipeId();
			this.fixIngredients();
			this.fixInstructions();

			firebase.database().ref("recipes").push(this.recipe);
			alert("Recipe added!");
			this.removeDraft();
			this.$router.push("/");
		},
		testPost() {
			this.recipe.title = "Test";
			this.recipe.description = "Test";
			this.addRecipeId();
			this.recipe.ingredients = [
				{
					name: "Test",
					amount: "1",
					measurment: "Test",
					section: "Test section",
				},
			];
			this.recipe.instructions = [
				{
					id: 0,
					checked: true,
					text: "Test",
				},
				{
					id: 1,
					checked: false,
					text: "Test2",
				},
			];
			this.recipe.servings = "4";
			this.recipe.link = "www.google.com";
			this.recipe.imgLink = "";

			firebase.database().ref("recipes").push(this.recipe);
			alert("Test recipe added!");
		},
		saveAsDraft() {
			// save all inputs to localstorage as a draft
			this.addRecipeId();
			this.fixIngredients();
			this.fixInstructions();

			const draft = {
				title: this.recipe.title,
				description: this.recipe.description,
				ingredients: this.recipe.ingredients,
				instructions: this.recipe.instructions,
				servings: this.recipe.servings,
				link: this.recipe.link,
				imgLink: this.recipe.imgLink,
			};

			localStorage.setItem("draft", JSON.stringify(draft));
		},
		getDraft() {
			// get draft from localstorage
			const draft = JSON.parse(localStorage.getItem("draft"));
			if (draft) {
				this.draft = draft;
			}
		},
		putBackDraft() {
			// put draft back to inputs
			this.recipe.title = this.draft.title;
			this.recipe.description = this.draft.description;
			this.recipe.servings = this.draft.servings;
			this.recipe.link = this.draft.link;
			this.recipe.imgLink = this.draft.imgLink;

			this.recipe.ingredients = this.draft.ingredients;
			this.recipe.instructions = this.draft.instructions;

			this.putBackIngredients();
			this.putBackInstructions();

			this.removeDraft();
		},
		putBackIngredients() {
			// if ingredients is more than 1 ingredient, add needed input fields with this.addIngredient()
			if (this.recipe.ingredients.length > 1) {
				for (let i = 1; i < this.recipe.ingredients.length; i++) {
					this.addIngredient();
				}
			}
			// fill in the inputs with the values from draft
			//get all inputs in all ingredients class
			const ingredients = document.getElementsByClassName("ingredients");
			//loop through all ingredients
			for (let i = 0; i < ingredients.length; i++) {
				//get all inputs in current ingredient
				const inputs = ingredients[i].querySelectorAll("input");
				//loop through all inputs
				for (let j = 0; j < inputs.length; j++) {
					//if the input name is text, then put the name from the draft in the input
					if (inputs[j].name === "name") {
						inputs[j].value = this.recipe.ingredients[i].name;
					}
					//if the input name is amount, then put the amount from the draft in the input
					if (inputs[j].name === "amount") {
						inputs[j].value = this.recipe.ingredients[i].amount;
					}
					//if the input name is measurment, then put the measurment from the draft in the input
					if (inputs[j].name === "measurment") {
						inputs[j].value = this.recipe.ingredients[i].measurment;
					}

					//if the input name is section, then put the section from the draft in the input
					if (inputs[j].name === "section") {
						inputs[j].value = this.recipe.ingredients[i].section;
					}
				}
			}
		},
		putBackInstructions() {
			// if instructions is more than 1 instruction, add needed input fields with this.addInstruction()
			if (this.recipe.instructions.length > 1) {
				for (let i = 1; i < this.recipe.instructions.length; i++) {
					this.addInstruction();
				}
			}
			// fill in the inputs with the values from draft
			//get all inputs in all instructions class
			const instructions = document.getElementsByClassName("instructions");
			//loop through all instructions
			for (let i = 0; i < instructions.length; i++) {
				//get all inputs in current instruction
				const inputs = instructions[i].querySelectorAll("input");
				//loop through all inputs
				for (let j = 0; j < inputs.length; j++) {
					//if the input name is text, then put the text from the draft in the input
					if (inputs[j].name === "text") {
						inputs[j].value = this.recipe.instructions[i].text;
					}
					//if the input name is checked, then put the checked from the draft in the input
					if (inputs[j].name === "checked") {
						inputs[j].value = this.recipe.instructions[i].checked;
					}
					//if the input name is id, then put the id from the draft in the input
					if (inputs[j].name === "id") {
						inputs[j].value = this.recipe.instructions[i].id;
					}
				}
			}
		},
		removeDraft() {
			// remove draft from localstorage
			this.draft = [];
			localStorage.removeItem("draft");
		},
		addRecipeId() {
			this.recipe.recipeId = this.$store.state.recipesList.length;
		},
	},
	mounted() {
		this.addRecipeId();
		this.getDraft();
		const inputs = document.getElementsByTagName("input");
		const textareas = document.getElementsByTagName("textarea");
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener("change", this.saveAsDraft);
		}
		for (let i = 0; i < textareas.length; i++) {
			textareas[i].addEventListener("change", this.saveAsDraft);
		}
	},
};
</script>

<style lang="scss" scoped>
#addRecipe * {
  box-sizing: border-box;
}

#addRecipe {
  margin: 20px auto;
  padding: 10px;
  max-width: 500px;
}

label {
  display: block;
  margin: 20px auto 2px auto;

  span {
    font-size: 0.8em;
    color: rgb(172, 172, 172);
  }
}

input[type="text"],
input[type="number"],
textarea {
  display: block;
  width: 100%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 4px;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(172, 172, 172);
  opacity: 0.7; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(172, 172, 172);
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: rgb(172, 172, 172);
}

button[type="submit"] {
  display: block;
  margin: 20px auto;
  background-color: lightblue;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.ingredients,
.instructions {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
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
