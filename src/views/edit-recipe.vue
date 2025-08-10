<template>
  <div>
    <form action="" id="container">
      <InputText type="text" name="title" id="title" placeholder="title" v-model="recipe.title" />
      <label for="drink">drink?</label>
      <Checkbox 
        id="drink"
        name="drink"
        :value="recipe.drink"
        v-model="recipe.drink"
      />
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

      <div id="labels">
        <label for="amount" style="flex: 0.25">Quantity:</label>
        <label for="ingredientUnit" style="flex: 0.25">Unit:</label>
        <label for="ingredientName" style="flex: 0.65">Ingredient Name:</label>
        <label for="ingredientSection" style="flex: 0.25">Section:</label>
      </div>
      <div id="ingredientsList">
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="editIngredients">
          <InputText type="text" v-model="ingredient.amount" placeholder="Amount" style="flex: 0.25" />
          <InputText type="text" v-model="ingredient.measurment" placeholder="Unit" style="flex: 0.25" />
          <AutoCompletingIngredientInput v-model="ingredient.name" placeholder="Ingredient Name" style="flex: 0.65" />
          <InputText type="text" v-model="ingredient.section" placeholder="Section" style="flex: 0.25" />
          <Button 
            v-if="recipe.ingredients.length > 1"
            variant="text" 
            type="button" 
            @click="removeIngredientAt(index)" 
            class="removeIngredientBtn" 
            style="flex: 0.1"
          >-</Button>
          <Button
            variant="text"
            v-if="index === recipe.ingredients.length - 1"
            type="button"
            @click="addIngredient"
            class="addIngredientBtn"
            style="flex: 0.1"
          >+</Button>
        </div>
      </div>
      
      <div id="labels">
        <label for="checked" style="flex: 0.15">Checked:</label>
        <label for="id" style="flex: 0.15">Id:</label>
        <label for="name" style="flex: 0.8">Instruction:</label>
      </div>
      <div id="instructionsList">
        <div v-for="(instruction, index) in recipe.instructions" :key="index" class="editInstructions">
          <Checkbox
            v-model="instruction.checked"
            :id="'instruction-' + index"
            style="flex: 0.15"
          />
          <InputText type="number" v-model="instruction.id" placeholder="Id" style="flex: 0.15" />
          <InputText type="text" v-model="instruction.text" placeholder="Instruction" style="flex: 0.8" />
          <Button 
            v-if="recipe.instructions.length > 1"
            variant="text" 
            type="button" 
            @click="removeInstructionAt(index)" 
            class="removeInstructionBtn" 
            style="flex: 0.1"
          >-</Button>
          <Button
            variant="text"
            v-if="index === recipe.instructions.length - 1"
            type="button"
            @click="addInstruction"
            class="addInstructionBtn"
            style="flex: 0.1"
          >+</Button>
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
import { Button, Checkbox, InputText } from "primevue";

export default {
  name: "edit-recipe",
  components: {
    AutoCompletingIngredientInput,
    Button,
    InputText,
    Checkbox,
  },
  data() {
    return {
      recipe: {
        title: "",
        drink: false,
        description: "",
        imgLink: "",
        ingredients: [
          { amount: "", measurment: "", name: "", section: "" },
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
      this.recipe.ingredients.push({ amount: "", measurment: "", name: "", section: "" });
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

      const recipeFirebase = db.ref(`recipes/${dbKeys[this.$route.params.id]}`);
      recipeFirebase.update(this.recipe);
      alert("Recipe updated!");
      this.$router.push(`/recipe/${this.$route.params.id}`);
    },
    putRecipeDetailsInInputs() {
      const currentRecipe = this.currentRecipe;
      this.recipe = JSON.parse(JSON.stringify(currentRecipe)); // Deep copy to avoid mutating the store
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
  max-width: 95vw;

  @media (min-width: 600px) {
    max-width: 80vw;
  }
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

#labels {
  display: flex;
  flex-direction: row;
  margin: 10px 0;

  label {
    flex: 1;
  }
}
</style>
