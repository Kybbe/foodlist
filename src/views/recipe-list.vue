<template>
  <div>
    <div class="searchArea">
      <select name="sortBy" id="select" v-model="sortBy">
        <option value="recipeId">Recipe Id</option>
        <option value="alphabetically">Alphabetically</option>
        <option value="foods">Foods</option>
        <option value="drinks">Drinks</option>
      </select>
      <select name="ingredients" id="ingredients" v-model="selectedIngredient">
        <option value="">All Ingredients</option>
        <option
          v-for="ingredient in sortAndListIngredients"
          :key="ingredient.name"
          :value="ingredient.name"
        >
          {{ ingredient.name }} ({{ ingredient.value }})
        </option>
      </select>
      <input
        type="text"
        v-model="searchValue"
        placeholder="Search Recipe"
        id="search-input"
      />
    </div>
    <div id="randomContainer">
      <router-link :to="'/recipe/' + this.randomNumber" id="randomRecipe"
        >Go to random recipe</router-link
      >
    </div>
    <transition-group class="cardList" tag="div" name="cardList">
      <div class="cardM" v-for="recipe in searchResult" :key="recipe.recipeId">
        <router-link
          :to="'/recipe/' + recipe.recipeId"
          v-if="searchResult != null || searchResult != []"
        >
          <div
            class="imgPart"
            :style="backgroundimg(recipe.imgLink, recipe.recipeId)"
          >
            <div class="plateIcon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="utensils"
                class="svg-inline--fa fa-utensils fa-w-13"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 416 512"
              >
                <path
                  fill="currentColor"
                  d="M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ recipe.title }}</h2>
            <p class="card-text">{{ recipe.description }}</p>
            <div class="extras">
              <p class="card-ingredients">
                <span>{{ recipe.ingredients.length }}</span> Ingredient<span
                  v-if="recipe.ingredients.length > 1"
                  >s</span
                >
              </p>
              <p class="card-steps">
                <span>{{ recipe.instructions.length }}</span> Step<span
                  v-if="recipe.instructions.length > 1"
                  >s</span
                >
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="cardS" v-for="drink in drinks" :key="drink.recipeId">
        <router-link
          :to="'/recipe/' + drink.recipeId"
          v-if="drinks != null || drinks != []"
        >
          <div
            class="imgPart"
            :style="backgroundimg(drink.imgLink, drink.recipeId)"
          >
            <div class="plateIcon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="cocktail"
                class="svg-inline--fa fa-cocktail fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M296 464h-56V338.78l168.74-168.73c15.52-15.52 4.53-42.05-17.42-42.05H24.68c-21.95 0-32.94 26.53-17.42 42.05L176 338.78V464h-56c-22.09 0-40 17.91-40 40 0 4.42 3.58 8 8 8h240c4.42 0 8-3.58 8-8 0-22.09-17.91-40-40-40zM432 0c-62.61 0-115.35 40.2-135.18 96h52.54c16.65-28.55 47.27-48 82.64-48 52.93 0 96 43.06 96 96s-43.07 96-96 96c-14.04 0-27.29-3.2-39.32-8.64l-35.26 35.26C379.23 279.92 404.59 288 432 288c79.53 0 144-64.47 144-144S511.53 0 432 0z"
                />
              </svg>
            </div>
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ drink.title }}</h2>
            <p class="card-text">{{ drink.description }}</p>
            <div class="extras">
              <p class="card-ingredients">
                <span>{{ drink.ingredients.length }}</span> Ingredient<span
                  v-if="drink.ingredients.length > 1"
                  >s</span
                >
              </p>
              <p class="card-steps">
                <span>{{ drink.instructions.length }}</span> Step<span
                  v-if="drink.instructions.length > 1"
                  >s</span
                >
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="cardM" v-if="noResults">
        <div class="card-body">
          <h1 class="card-title" style="text-align: center">
            No results found
          </h1>
          <h3 style="text-align: center">
            Sorry, we couldn't find any results for your search. :(
          </h3>
          <h3 style="text-align: center">Have a cookie instead!</h3>
          <div style="display: flex; justify-content: center">
            <svg
              style="width: 9em; text-align: center"
              id="Layer_1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="cookie"
              class="svg-inline--fa fa-cookie fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M510.37 254.79l-12.08-76.26a132.493 132.493 0 0 0-37.16-72.95l-54.76-54.75c-19.73-19.72-45.18-32.7-72.71-37.05l-76.7-12.15c-27.51-4.36-55.69.11-80.52 12.76L107.32 49.6a132.25 132.25 0 0 0-57.79 57.8l-35.1 68.88a132.602 132.602 0 0 0-12.82 80.94l12.08 76.27a132.493 132.493 0 0 0 37.16 72.95l54.76 54.75a132.087 132.087 0 0 0 72.71 37.05l76.7 12.14c27.51 4.36 55.69-.11 80.52-12.75l69.12-35.21a132.302 132.302 0 0 0 57.79-57.8l35.1-68.87c12.71-24.96 17.2-53.3 12.82-80.96zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="cardM"
        style="max-height: 350px; box-sizing: border-box"
        v-if="loggedIn"
      >
        <router-link :to="'/add'">
          <div class="svgCardBody">
            <svg
              id="Layer_1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              class="svg-inline--fa fa-plus fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
              />
            </svg>
          </div>
        </router-link>
      </div>
    </transition-group>
    <footerBar />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import footerBar from "../components/footer.vue";
export default {
  name: "RecipeList",
  components: {
    footerBar,
  },
  props: {
    recipesList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchValue: "",
      sortBy: "recipeId",
      selectedIngredient: "",
      randomNumber: 0,
      loggedIn: false,
    };
  },
  methods: {
    backgroundimg(specificLink, thisId) {
      if (specificLink == "") {
        // if no image is provided, give it one
        if (this.recipesList[thisId].drink) {
          // if it's a drink, give it a drink image
          specificLink =
            "https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg";
        } else {
          // if it's a recipe, give it a recipe image
          specificLink =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg";
        }
      }
      return {
        // if there is an image, give it back as background image string
        "background-image": `url(${specificLink})`,
      };
    },
    IsLoggedIn() {
      let user = firebase.auth().currentUser;

      if (user) {
        this.loggedIn = true; // If it exists
      } else {
        this.loggedIn = false; // If it doesn't
      }
    },
  },
  computed: {
    searchResult() {
      var tempRecipes = this.recipesList;
      // remove all recipe with drink property
      tempRecipes = tempRecipes.filter((recipe) => {
        return !recipe.drink;
      });

      if (this.searchValue != "" && this.searchValue) {
        tempRecipes = tempRecipes.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      if (this.selectedIngredient != "") {
        // filter recipes by selected ingredient
        // ingredient name is stored in the recipe.ingredients.name property
        tempRecipes = tempRecipes.filter((item) => {
          return item.ingredients.some((ingredient) => {
            return ingredient.name
              .toUpperCase()
              .includes(this.selectedIngredient.toUpperCase());
          });
        });
      }

      tempRecipes = tempRecipes.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;

          // Sort by id
        } else if (this.sortBy == "recipeId") {
          return a.recipeId - b.recipeId;
        }
      });

      if (this.sortBy == "drinks") {
        return null;
      }

      return tempRecipes;
    },
    drinks() {
      var tempDrinks = this.recipesList;
      // keep only recipes with drink property
      tempDrinks = tempDrinks.filter((recipe) => {
        return recipe.drink;
      });

      if (this.searchValue != "" && this.searchValue) {
        tempDrinks = tempDrinks.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      if (this.selectedIngredient != "") {
        // filter recipes by selected ingredient
        // ingredient name is stored in the recipe.ingredients.name property
        tempDrinks = tempDrinks.filter((item) => {
          return item.ingredients.some((ingredient) => {
            return (
              ingredient.name.toUpperCase() ==
              this.selectedIngredient.toUpperCase()
            );
          });
        });
      }

      tempDrinks = tempDrinks.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;

          // Sort by id
        } else if (this.sortBy == "recipeId") {
          return a.recipeId - b.recipeId;
        }
      });

      if (this.sortBy == "foods") {
        return null;
      }

      return tempDrinks;
    },
    sortAndListIngredients() {
      // get all recipe ingredients and put into array
      var tempIngredients = [];
      this.recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          tempIngredients.push(ingredient.name);
        });
      });

      // count each ingredient and put into array
      var tempIngredientsCount = [];
      tempIngredients.forEach((ingredient) => {
        var count = 0;
        tempIngredients.forEach((ingredient2) => {
          if (ingredient == ingredient2) {
            count++;
          }
        });
        tempIngredientsCount.push({ name: ingredient, value: count });
      });

      // remove duplicates
      var tempIngredientsCount2 = [];
      tempIngredientsCount.forEach((ingredient) => {
        var count = 0;
        tempIngredientsCount2.forEach((ingredient2) => {
          if (ingredient.name == ingredient2.name) {
            count++;
          }
        });
        if (count == 0) {
          tempIngredientsCount2.push(ingredient);
        }
      });

      // sort by value and if same value, sort by name
      tempIngredientsCount2.sort((a, b) =>
        a.value > b.value
          ? -1
          : a.value < b.value
          ? 1
          : a.name > b.name
          ? 1
          : -1
      );

      return tempIngredientsCount2;
    },
    noResults() {
      if (this.drinks == null || this.drinks.length == 0) {
        if (this.searchResult == null || this.searchResult.length == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.randomNumber = Math.floor(Math.random() * this.recipesList.length);
    this.IsLoggedIn();
    firebase.auth().onAuthStateChanged(() => {
      this.IsLoggedIn();
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 0px;
}

.searchArea {
  display: flex;
  flex-wrap: wrap;

  select,
  #search-input {
    margin: 1em;
    padding: 0.4em;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
    font-size: 1.2em;
    width: 100%;
  }

  select {
    margin-bottom: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  #ingredients {
    margin: 0px 1em;
    border-radius: 0px;
  }

  #search-input {
    margin: 0px 1em;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
}

#randomContainer {
  display: flex;
  justify-content: center;
  margin-top: 0.4em;
  margin-bottom: 1em;

  #randomRecipe {
    padding: 5px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #4a8ee7;
    color: white;
  }
}

.cardList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.cardList-enter-active,
.cardList-leave-active,
.cardList-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.cardList-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.cardList-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.cardList-leave-active {
  position: absolute;
}

.cardList-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

/* .cardList-enter,
.cardList-leave-to { opacity: 0; }
.cardList-enter-active,
.cardList-leave-active { transition: 0.5s; } */

.cardM,
.cardS {
  background-color: white;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);

  &:hover svg,
  &:focus svg {
    transition: 4s;
    transform: rotate(360deg);
  }
}

.cardM {
  width: 30em;

  .card-body {
    padding: 1em 1em 0 1em;
  }

  .card-text {
    margin-bottom: 3.5em;
  }

  .extras {
    margin-top: 0.5em;
    margin-bottom: 1em;
  }
}

.cardS {
  width: 13em;

  .card-body {
    padding: 0.8em 0.5em 0em 0.5em;
  }

  .card-text {
    margin-bottom: 3em;
  }

  .extras {
    margin: 0.5em 0em;
  }
}

@media (max-width: 30em) {
  .cardS {
    width: 100%;
  }
}

.svgCardBody {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  box-sizing: border-box;
  overflow: hidden;
}

#Layer_1 {
  height: 100%;
  transition: 4s;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
}

#Layer_1 > * {
  color: #4a8ee7;
}

.imgPart {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 10px 10px 0px 0px;
  position: relative;

  .plateIcon {
    position: absolute;
    right: 10px;
    bottom: -1em;
    width: 2em;
    height: 2em;

    background-color: #4a8ee7;
    padding: 0.7em;
    border-radius: 50%;

    svg {
      position: relative;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      fill: white;
      transition: 4s;

      path {
        fill: white;
      }
    }
  }
}

.card-body {
  position: relative;
  height: calc(100% - 200px);
  box-sizing: border-box;
  word-break: break-word;

  .card-title {
    margin-top: 0px;
  }

  .extras {
    display: flex;
    position: absolute;
    bottom: 0px;

    .card-ingredients,
    .card-steps {
      background-color: #4a8ee7;
      padding: 0.5em;
      font-size: 1em;
      line-height: 1em;
      border-radius: 10px;
      text-align: center;
      color: rgb(230, 230, 230);
      margin: 0;
      flex-shrink: 0;
      margin: 0px 5px;
      box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);

      span {
        color: white;
      }
    }

    .card-ingredients {
      margin-left: 0px;
    }
  }
}

a {
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:hover .card-title {
    text-decoration: underline;
  }
}

@media (min-width: 500px) {
  .searchArea {
    flex-wrap: nowrap;

    select,
    #search-input {
      margin: 1em 0.8em 0 0.8em;
      padding: 0.4em;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
      font-size: 1.2em;
    }

    select {
      margin-right: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      width: unset;
    }

    #ingredients {
      margin: 1em 0em 0em 0em;
      width: 9.4em;
    }

    #search-input {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      width: 100%;
      margin-left: 0px;
    }
  }
}

@media (min-width: 900px) {
  #ingredients {
    width: unset !important;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
