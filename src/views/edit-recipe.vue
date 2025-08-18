<template>
  <div>
    <div v-if="!$store.state.recipesReady" class="centeredLoading">
      <h1>Loading...</h1>
    </div>
    <form action="" id="container" v-if="$store.state.recipesReady">
      <InputText type="text" name="title" id="title" placeholder="title" v-model="recipe.title" />
      <div id="drinkContainer">
        <label for="drink">drink?</label>
        <Checkbox 
          id="drink"
          name="drink"
          :value="recipe.drink"
          v-model="recipe.drink"
        />
      </div>
      <InputText
        type="text"
        name="description"
        id="description"
        placeholder="description"
        v-model="recipe.description"
      />
      <InputText
        type="text"
        name="imgLink"
        id="imgLink"
        placeholder="imgLink"
        v-model="recipe.imgLink"
      />

      <div id="ingredientsList">
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="editIngredients">
          <FloatLabel variant="on">
            <InputText :id="'amount-' + index" v-model="ingredient.amount" />
            <label :for="'amount-' + index">Quantity</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText :id="'unit-' + index" v-model="ingredient.measurement" />
            <label :for="'unit-' + index">Unit</label>
          </FloatLabel>

          <AutoCompletingIngredientInput :id="'ingredient-' + index" :value="ingredient.name" placeholder="Name" />
          
          <FloatLabel variant="on">
            <InputText :id="'section-' + index" v-model="ingredient.section" />
            <label :for="'section-' + index">Section</label>
          </FloatLabel>
          <div id="ingredientsAddAndRemoveContainer">
            <Button 
              v-if="recipe.ingredients.length > 1"
              variant="text" 
              type="button" 
              @click="removeIngredientAt(index)" 
              class="removeIngredientBtn" 
            >-</Button>
            <Button
              variant="text"
              v-if="index === recipe.ingredients.length - 1"
              type="button"
              @click="addIngredient"
              class="addIngredientBtn"
            >+</Button>
            <div id="ingredientsAddStand-in"
              v-if="index != recipe.ingredients.length - 1"
            ></div>
          </div>
        </div>
      </div>
      
      <div id="instructionsList">
        <div v-for="(instruction, index) in recipe.instructions" :key="index" class="editInstructions">
          <Checkbox
            v-model="instruction.checked"
            :id="'instruction-checked-' + index"
          />
          <FloatLabel variant="on">
            <InputText type="number" :id="'instruction-id-' + index" v-model="instruction.id" style="width: 3em;" />
            <label :for="'instruction-id-' + index">Id</label>
          </FloatLabel>
          <FloatLabel variant="on" style="width: 100%;">
            <InputText type="text" :id="'instruction-text-' + index" v-model="instruction.text" />
            <label :for="'instruction-text-' + index">Instruction</label>
          </FloatLabel>
          <div id="instructionAddAndRemoveContainer">
            <Button 
              v-if="recipe.instructions.length > 1"
              variant="text" 
              type="button" 
              @click="removeInstructionAt(index)" 
              class="removeInstructionBtn" 
            >-</Button>
            <Button
              variant="text"
              v-if="index === recipe.instructions.length - 1"
              type="button"
              @click="addInstruction"
              class="addInstructionBtn"
            >+</Button>
            <div id="instructionAddStand-in"
              v-if="index != recipe.instructions.length - 1"
            ></div>
          </div>
        </div>
      </div>

      <InputText type="text" name="servings" id="servings" placeholder="servings" v-model="recipe.servings" />
      <InputText type="text" name="link" id="link" placeholder="link" v-model="recipe.link" />
      <Button @click.prevent="editFirebase" type="submit" id="updateRecipeBtn">Update</Button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import AutoCompletingIngredientInput from "../components/autoCompletingIngredientInput.vue";
import { Button, Checkbox, InputText, FloatLabel } from "primevue";

import { useStore } from "vuex";

export default {
  name: "edit-recipe",
  components: {
    AutoCompletingIngredientInput,
    Button,
    InputText,
    Checkbox,
    FloatLabel,
  },
  data() {
    return {
      recipe: {
        title: "",
        drink: false,
        description: "",
        imgLink: "",
        ingredients: [
          { amount: "", measurement: "", name: "", section: "" },
        ],
        instructions: [
          { checked: false, id: 0, text: "" },
        ],
        servings: "",
        link: "",
      },
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
      this.recipe.instructions.push({ checked: false, id: this.recipe.instructions.length, text: "" });
    },
    removeInstructionAt(index) {
      if (this.recipe.instructions.length > 1) {
        this.recipe.instructions.splice(index, 1);
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

      if(dbKeys.length <= this.$route.params.id) {
        alert("dbKeys length is less than id!");
        return;
      }
      if(dbKeys[this.$route.params.id] === undefined) {
        alert("dbKeys[this.$route.params.id] is undefined!");
        return;
      }

      const recipeFirebase = db.ref(`recipes/${dbKeys[this.$route.params.id]}`);
      recipeFirebase.update(this.recipe);
      alert("Recipe updated!");
      this.$router.push(`/recipe/${this.$route.params.id}`);
    },
    putRecipeDetailsInInputs() {
      const currentRecipe = this.currentRecipe;
      if (!currentRecipe) {
        console.error("No current recipe found");
        return;
      }
      this.recipe = JSON.parse(JSON.stringify(currentRecipe)); // Deep copy to avoid mutating the store
    },
  },
  mounted() {
    this.putRecipeDetailsInInputs();
  },
  computed: {
    currentRecipeId() {
      return this.$route.params.id;
    },
    currentRecipe() {
      console.log("recipeList", this.$store.state.recipesList);
      return this.$store.state.recipesList[this.currentRecipeId]; 
    },
		store() {
			return useStore();
		},
  },
  watch: {
    '$store.state.recipesReady'(newVal) {
      if (newVal) {
        this.putRecipeDetailsInInputs();
      }
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
  scroll-behavior: smooth;
}

.centeredLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#container * {
  box-sizing: border-box;
}

#container {
  margin: 20px auto;
  padding: 10px;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

#drink {
  display: inline-block !important;
  width: unset !important;
}

#drinkContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

#ingredientsList,
#instructionsList {
  background-color: #cbf3ff;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border-radius: 5px;

  input {
    width: 100%;
  }
}

.editInstructions,
.editIngredients {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
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
</style>
