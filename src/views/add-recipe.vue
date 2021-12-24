<template>
  <div>
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
          </div>
          <div class="ingredients">
            <input type="number" placeholder="2" name="amount" class="amount" />
            <input type="text" placeholder="Large" name="measurment" />
            <input
              type="text"
              placeholder="Tomatoes"
              name="name"
              v-on:change="fixIngredients"
              required
            />
          </div>
        </div>
        <button type="button" v-on:click="addIngredient">Add Ingredient</button>
        <button
          type="button"
          v-on:click="removeIngredient"
          v-if="moreThanOneIngredient"
        >
          Remove Ingredient
        </button>
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
          <textarea
            class="form-control"
            id="recipeInstructions"
            rows="3"
            v-on:change="fixInstructions"
            placeholder="1. Preheat oven to 350 degrees. ,2. Mix ingredients. ,3. Bake for 20 minutes."
          ></textarea>
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

export default {
  name: "AddRecipe",
  data() {
    return {
      recipe: {
        recipeId: "",
        title: "",
        description: "",
        ingredients: [],
        instructions: [],
        servings: "",
        link: "",
        imgLink: "",
      },
      moreThanOneIngredient: false,
    };
  },
  methods: {
    addIngredient() {
      let ingredientTemplate = document
        .getElementsByClassName("ingredients")[0]
        .cloneNode(true);

      // set value of all inputs in ingredientTemplate to empty string
      let inputs = document
        .getElementsByClassName("ingredients")[0]
        .querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }

      document
        .getElementsByClassName("ingredients")[0]
        .parentNode.appendChild(ingredientTemplate);

      this.moreThanOneIngredient = true;
    },
    removeIngredient() {
      let ingredients = document.getElementsByClassName("ingredients");
      if (ingredients.length > 1) {
        ingredients[ingredients.length - 1].remove();
      }
      if (ingredients.length == 1) {
        this.moreThanOneIngredient = false;
      }
    },
    fixIngredients() {
      let ingredients = [];
      let ingredientsGroups = document.getElementsByClassName("ingredients");
      for (let i = 0; i < ingredientsGroups.length; i++) {
        let ingredient = {};
        let inputs = ingredientsGroups[i].querySelectorAll("input");
        for (let j = 0; j < inputs.length; j++) {
          ingredient[inputs[j].name] = inputs[j].value;
        }
        ingredients.push(ingredient);
      }
      this.recipe.ingredients = ingredients;
      this.checkServings();
    },
    fixInstructions() {
      let instructionsRaw = document.getElementById("recipeInstructions").value;
      let instructions = instructionsRaw
        .split(",")
        .map((instruction, index) => {
          return {
            id: index,
            checked: false,
            text: instruction,
          };
        });
      this.recipe.instructions = instructions;
    },
    checkServings() {
      // servings is 4 by default,
      // if user inputs a number, it will be the number
      // if users number is less or more than 4, divide all ingredient amounts by input and multiply by 4.
      let servings = document.getElementById("recipeServings").value;
      if (servings == "") {
        return;
      }
      if (servings) {
        if (document.getElementsByClassName("amount")[0].value == "") {
          return;
        }
        let ingredients = this.recipe.ingredients;
        let amounts = document.getElementsByClassName("amount");
        for (let i = 0; i < ingredients.length; i++) {
          if (amounts[i].value == "") {
            return;
          }
          let oneServing = ingredients[i].amount / servings;
          let fourServings = oneServing * 4;
          fourServings = Number(fourServings.toFixed(1));
          ingredients[i].amount = fourServings;
          amounts[i].value = fourServings;
        }
        this.recipe.ingredients = ingredients;
      }
    },
    post() {
      if (this.recipe.title == "Test JKL") {
        this.recipe.title = "Test";
        this.recipe.description = "Test";
        this.addRecipeId();
        this.recipe.ingredients = [
          {
            name: "Test",
            amount: "1",
            measurment: "Test",
          },
        ];
        this.recipe.instructions = [
          {
            id: 0,
            checked: true,
            text: "Test",
          },
        ];
        this.recipe.servings = "4";
        this.recipe.link = "www.google.com";
        this.recipe.imgLink = "";

        firebase.database().ref("recipes").push(this.recipe);
        alert("Recipe added!");
        this.$router.push("/");
        return;
      }

      if (
        this.recipe.title == "" ||
        this.recipe.description == "" ||
        this.recipe.ingredients == "" ||
        this.recipe.instructions == "" ||
        this.recipe.link == ""
      ) {
        alert("Please fill out all fields");
        return;
      }

      this.addRecipeId();
      firebase.database().ref("recipes").push(this.recipe);
      alert("Recipe added!");
      this.$router.push("/");
    },
    addRecipeId() {
      this.recipe.recipeId = this.recipesList.length;
    },
  },
  mounted() {
    this.addRecipeId();
  },
  props: {
    recipesList: Array,
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

.ingredients {
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
