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
				<div class="form-group recipeDescription">
					<FloatLabel variant="on">
						<InputText id="recipeDescription" v-model="recipe.description" />
						<label for="recipeDescription">Recipe Description</label>
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
				<div class="form-group recipeIngredients">
					<label for="recipeIngredients">Recipe Ingredients:</label>
					<div id="ingredientsList">
						<div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredients">
							<FloatLabel variant="on">
								<InputText id="'amount-' + index" v-model="ingredient.amount"/>
								<label for="'amount-' + index">Amount (eg. 2)</label>
							</FloatLabel>
							<FloatLabel variant="on">
								<InputText id="'measurement-' + index" v-model="ingredient.measurement" />
								<label for="'measurement-' + index">Unit (eg. st)</label>
							</FloatLabel>
							<AutoCompletingIngredientInput :value="ingredient.name" placeholder="Name (eg. Tomatoes)" />
							<FloatLabel variant="on">
								<InputText id="'section-' + index" v-model="ingredient.section" />
								<label for="'section-' + index">Section (eg. Salad)</label>
							</FloatLabel>
							<div id="ingredientsAddAndRemoveContainer">
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
								<div id="ingredientsAddStand-in"
									v-if="index != recipe.ingredients.length - 1"
								></div>
							</div>
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

							<div id="instructionAddAndRemoveContainer">
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
								<div id="instructionAddStand-in"
									v-if="index != recipe.instructions.length - 1"
								></div>
							</div>
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

	<div id="infoBox" class="info-box">
		<h3>Info for ChatGPT Recipe Extraction</h3>
		<button class="clipboard-btn" @click="copyInfoText" title="Copy to clipboard">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
		</button>
		<p id="infoText">
        <strong>"Please extract the ingredients and instructions (if in english or with imperial measurements please translate to swedish and convert to metric) from this recipe and return them as a JSON object with the following format:<br>
        {<br>
          title: string,<br>
          description: string,<br>
					drink: boolean,<br>
          ingredients: [ { amount: number (with .5 as half etc, leave as empty quotes if nothing), measurement: string (in swedish, st for pieces, leave as empty quotes if none), name: string (Capitalize), section: string (leave as empty quotes if none) } ],
          instructions: [ { id: number, checked: boolean, text: string } ],<br>
          servings: number,<br>
          link: string,<br>
          imgLink: string<br>
        }<br>
        Here is the recipe link: "</strong>
		</p>
	</div>
	<div id="jsonBox" class="json-box">
		<h3>Recipe JSON (Live)</h3>
		<textarea
			id="recipeJson"
			v-model="recipeJsonString"
			@input="updateRecipeFromJson"
			rows="12"
			style="width:100%;font-family:monospace;font-size:1em;resize:vertical;"
			placeholder="Recipe JSON will appear here. Paste a JSON from ChatGPT to fill the form."
		></textarea>
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
		title: "",
		description: "",
		drink: false,
		ingredients: [
		  { amount: "", measurement: "", name: "", section: "" },
		],
		instructions: [
		  { id: 0, checked: false, text: "" },
		],
		servings: "",
		link: "",
		imgLink: "",
	  },
	  draft: [],
	  recipeJsonString: "",
	};
  },
  methods: {
		addIngredient() {
			this.recipe.ingredients.push({ amount: "", measurement: "", name: "", section: "" });
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

			firebase.database().ref("recipes").push(this.recipe);
			alert("Recipe added!");
			this.removeDraft();
			this.$router.push("/");
		},
		saveAsDraft() {
			// save all inputs to localstorage as a draft
			this.addRecipeId();

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
		copyInfoText() {
			const infoText = `Please extract the ingredients and instructions (if in english or with imperial measurements please translate to swedish and convert to metric) from this recipe and return them as a JSON object with the following format:
			{
				title: string,
				description: string,
				drink: boolean,
				ingredients: [ { amount: number (with .5 as half etc, leave as empty quotes if nothing), measurement: string (in swedish, st for pieces, specifially 'measurement', leave as empty quotes if none), name: string (Capitalize), section: string (leave as empty quotes if none) } ] ,
				instructions: [ { id: number, checked: boolean, text: string } ],
				servings: number,
				link: string,
				imgLink: string
			}
			Here is the recipe link: `;
			navigator.clipboard.writeText(infoText).then(() => {
				// Optionally show a message
			});
		},
		updateRecipeFromJson(e) {
			try {
				const val = typeof e === "string" ? e : e.target.value;
				const parsed = JSON.parse(val);
				// Only update if valid object
				if (parsed && typeof parsed === "object") {
					// Defensive: only update known fields
					for (const key of Object.keys(this.recipe)) {
						if (parsed[key] !== undefined) {
							this.recipe[key] = parsed[key];
						}
					}
				}

				this.recipeJsonString = JSON.stringify(this.recipe, null, 2);
				this.addRecipeId();
				this.$forceUpdate();
			} catch (err) {
				// Ignore parse errors, don't update
			}
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
	watch: {
		recipe: {
			handler(val) {
				// Show live JSON
				this.recipeJsonString = JSON.stringify(val, null, 2);
			},
			deep: true,
			immediate: true,
		},
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

#instructionAddAndRemoveContainer,
#ingredientsAddAndRemoveContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  > * {
    padding: 0;
    font-size: 1.5em;
    line-height: 0;

    width: 1.5em;
    height: 1.5em;

    flex-shrink: 0;

    border: none;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }  

  /* stand ins for the buttons when not shown, so every row is same width */
  #instructionAddStand-in,
  #ingredientsAddStand-in {
    background-color: transparent;
  }
}

button[type="submit"] {
	background-color: #4a8ee7;

	&:hover {
		background-color: #3a6bb7;
	}
}

.clipboard-btn {
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  z-index: 2;

	svg {
		width: 24px;
		height: 24px;
		fill: #4a8ee7;
		transition: all 0.2s ease;

		&:hover {
			fill: #3a6bb7;
			transform: scale(1.1);
		}
	}
}

.info-box {
  margin: 30px auto 0 auto;
  padding: 16px;
  max-width: 600px;
  background: #f5faff;
  border: 1px solid #4a8ee7;
  border-radius: 10px;
  color: #333;
  font-size: 1em;
  box-shadow: 2px 2px 8px rgba(128,128,128,0.1);
  position: relative;
  h3 {
    margin-top: 0;
    color: #4a8ee7;
    font-size: 1.1em;
    position: relative;
  }
  strong {
    color: #1e74e4;
    font-size: 0.98em;
    font-weight: 500;
  }
  p {
    margin-bottom: 0;
    line-height: 1.5;
  }
}

.json-box {
  margin: 30px auto 0 auto;
  padding: 16px;
  max-width: 600px;
  background: #fffbe5;
  border: 1px solid #e7c84a;
  border-radius: 10px;
  color: #333;
  font-size: 1em;
  box-shadow: 2px 2px 8px rgba(128,128,128,0.08);
  position: relative;
  h3 {
    margin-top: 0;
    color: #e7c84a;
    font-size: 1.1em;
    position: relative;
  }
  textarea {
    margin-top: 8px;
    border-radius: 6px;
    border: 1px solid #e7c84a;
    background: #fff;
    color: #333;
    padding: 8px;
    box-sizing: border-box;
  }
}
</style>
