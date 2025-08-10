<template>
  <div style="display: flex">
		<div id="draft" v-if="draft.length != 0">
			<ul>
			<li v-for="input in draft" :key="input.name">
				<p>{{ input }}</p>
			</li>
			</ul>
			<Button @click="putBackDraft">Input draft!</Button>
			<Button style="background-color: red" @click="removeDraft">
				Remove draft!
			</Button>
		</div>

		<div id="addRecipe">
			<h2>Add Recipe</h2>
			<form action="">
		<div class="form-group">
			<FloatLabel variant="on">
				<InputText id="recipeName" v-model="recipe.title" required />
				<label for="recipeName">Recipe Name / Title</label>
			</FloatLabel>
		</div>
		<div class="form-group isDrink">
			<label for="drink" style="display: inline-block">Drink? :</label>
			<Checkbox
				name="drink"
				inputId="drink"
				v-model="recipe.drink"
				:binary="true"
			/>
		</div>
		<div class="form-group recipeDescription">
			<FloatLabel variant="on">
				<InputText id="recipeDescription" v-model="recipe.description" />
				<label for="recipeDescription">Recipe Description</label>
			</FloatLabel>
		</div>
				<div class="form-group recipeIngredients">
					<label for="recipeIngredients">Recipe Ingredients:</label>
					<div id="ingredientsList">
						<div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredients">
							<FloatLabel variant="on">
								<InputText id="'amount-' + index" v-model="ingredient.amount"/>
								<label for="'amount-' + index">Amount (eg. 2)</label>
							</FloatLabel>
							<FloatLabel variant="on">
								<InputText id="'measurment-' + index" v-model="ingredient.measurment" />
								<label for="'measurment-' + index">Unit (eg. st)</label>
							</FloatLabel>
							<AutoCompletingIngredientInput v-model="ingredient.name" placeholder="Name (eg. Tomatoes)" />
							<FloatLabel variant="on">
								<InputText id="'section-' + index" v-model="ingredient.section" />
								<label for="'section-' + index">Section (eg. Salad)</label>
							</FloatLabel>
							<Button
								v-if="recipe.ingredients.length > 1"
								type="button"
								@click="removeIngredientAt(index)"
								variant="text"
								class="removeIngredientBtn"
							>
								-
							</Button>
							<Button
								v-if="index === recipe.ingredients.length - 1"
								variant="text"
								type="button"
								@click="addIngredient"
								class="addIngredientBtn"
							>
								+
							</Button>
						</div>
					</div>
				</div>

				<div class="form-group recipeInstructions">
					<label for="recipeInstructions">Recipe Instructions: </label>
					<div id="instructionsList">
						<div v-for="(instruction, index) in recipe.instructions" :key="index" class="instructions">
							<Checkbox v-model="instruction.checked" :binary="true" id="'instruction-checked-' + index" style="height: 100%" />
							<FloatLabel variant="on">
								<InputText type="number" v-model="instruction.id" id="'instruction-id-' + index" style="width: 3em;" />
								<label for="'instruction-id-' + index">Id</label>
							</FloatLabel>
							<FloatLabel variant="on" style="width: 100%;">
								<InputText type="text" v-model="instruction.text" required id="'instruction-text-' + index" />
								<label for="'instruction-text-' + index">Instruction (eg. Preheat oven to 350 degrees)</label>
							</FloatLabel>
							<Button
								v-if="recipe.instructions.length > 1"
								type="button"
								@click="removeInstructionAt(index)"
								class="removeInstructionBtn"
							>
								-
							</Button>
							<Button
								v-if="index === recipe.instructions.length - 1"
								type="button"
								@click="addInstruction"
								class="addInstructionBtn"
							>
								+
							</Button>
						</div>
					</div>
				</div>

				<div class="form-group recipeServings">
					<FloatLabel variant="on">
						<InputText type="number" id="recipeServings" v-model="recipe.servings" />
						<label for="recipeServings">Recipe Servings</label>
					</FloatLabel>
				</div>

				<div class="form-group recipeLink">
					<FloatLabel variant="on">
						<InputText type="text" id="recipeLink" v-model="recipe.link" />
						<label for="recipeLink">Original Recipe Link</label>
					</FloatLabel>	
				</div>
				<div class="form-group recipeImage">
					<FloatLabel variant="on">
						<InputText type="text" id="recipeImgLink" v-model="recipe.imgLink" />
						<label for="recipeImgLink">Recipe Image (Link)</label>
					</FloatLabel>
				</div>
				<Button @click.prevent="post" type="submit" label="Submit" />
			</form>
		</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AutoCompletingIngredientInput from "../components/autoCompletingIngredientInput.vue";
import { Button, Checkbox, InputText, FloatLabel } from "primevue";

export default {
	name: "AddRecipe",
  components: {
		AutoCompletingIngredientInput,
		Button,
		Checkbox,
		InputText,
		FloatLabel
  },
  data() {
	return {
	  recipe: {
		recipeId: "",
		drink: false,
		title: "",
		description: "",
		ingredients: [
		  { amount: "", measurment: "", name: "", section: "" },
		],
		instructions: [
		  { id: 0, checked: false, text: "" },
		],
		servings: "",
		link: "",
		imgLink: "",
	  },
	  draft: [],
	};
  },
  methods: {
		addIngredient() {
			this.recipe.ingredients.push({ amount: "", measurment: "", name: "", section: "" });
		},
		removeIngredientAt(index) {
			if (this.recipe.ingredients.length > 1) {
				this.recipe.ingredients.splice(index, 1);
			}
		},
		addInstruction() {
			this.recipe.instructions.push({ id: this.recipe.instructions.length, checked: false, text: "" });
		},
		removeInstructionAt(index) {
			if (this.recipe.instructions.length > 1) {
				this.recipe.instructions.splice(index, 1);
			}

			//check id of all instructions above this one, and lower by one for each
			for (let i = index; i < this.recipe.instructions.length; i++) {
				this.recipe.instructions[i].id--;
			}
		},
		post() {
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

			this.removeDraft();
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
  max-width: 700px;

	display: flex;
	flex-direction: column;
	gap: 10px;
}

form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

input,
textarea {
	width: 100%;
}

.ingredients,
.instructions {
  display: flex;
  flex-direction: row;
	gap: 4px;
	align-items: center;
	margin: 10px 0;
}

.removeIngredientBtn,
.removeInstructionBtn,
.addIngredientBtn,
.addInstructionBtn {	
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: #4a8ee7;
	font-size: 1.2em;
}

.removeIngredientBtn,
.removeInstructionBtn {
	color: red;
}

.addIngredientBtn,
.addInstructionBtn {
	color: green;
}

button[type="submit"] {
	background-color: #4a8ee7;

	&:hover {
		background-color: #3a6bb7;
	}
}
</style>
