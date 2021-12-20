<template>
  <navbar></navbar>

  <input
    type="text"
    v-model="searchValue"
    placeholder="Search Recipe"
    id="search-input"
  />

  <div class="cardList">
    <div class="card" v-for="recipe in searchResult" :key="recipe.title">
      <router-link :to="'/recipe/' + recipe.recipeId">
        <div class="imgPart" :style="backgroundimg(recipe.imgLink)">
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
          <p class="card-ingredients">
            Ingredients:
            <span
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.name"
              >{{ ingredient.name }},
            </span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";

export default {
  name: "RecipeList",
  components: {
    navbar,
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
    };
  },
  methods: {
    backgroundimg(specificLink) {
      if (specificLink == "") {
        specificLink =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg";
      }
      return {
        "background-image": `url(${specificLink})`,
      };
    },
  },
  computed: {
    searchResult() {
      var tempRecipes = this.recipesList;
      if (this.searchValue != "" && this.searchValue) {
        tempRecipes = tempRecipes.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }
      return tempRecipes;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 0px;
}

#search-input {
  width: calc(100% - calc(0.4em + 4em));
  margin: 2em;
  padding: 0.4em;
  font-size: 1.2em;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
}

.cardList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.card {
  width: 30em;
  background-color: white;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);

  &:hover svg {
    transition: 4s;
    transform: rotate(360deg);
  }
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
  padding: 1em 1em 0 1em;

  .card-title {
    margin-top: 0px;
  }

  .card-ingredients {
    font-size: 0.8em;
    color: rgb(53, 53, 53);
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

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
