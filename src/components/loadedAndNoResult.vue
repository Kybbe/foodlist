<template>
  <div class="cardM" :key="noResultsAndLoaded">
    <div class="loading-body" v-if="!loaded" :key="loaded">
      <h1 class="card-title" style="text-align: center">
        Loading
        {{
          this.recipeOrShoppingList === "recipe" ? "recipes" : "shopping lists"
        }}...
      </h1>
    </div>
    <div class="noResultCard-body" v-if="loaded && noResults" :key="noResults">
      <h1 class="card-title" style="text-align: center">No results found</h1>
      <h3 style="text-align: center">
        Sorry, we couldn't find any results for your search. :(
      </h3>
      <h3 style="text-align: center">Have a cookie instead!</h3>
      <div style="display: flex; justify-content: center; margin-bottom: 20px">
        <svg
          style="width: 9em; text-align: center"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="cookie"
          class="svg-inline--fa fa-cookie fa-w-16 Layer_1"
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
</template>

<script>
export default {
  name: "LoadedAndNoResult",
  data() {
    return {};
  },
  props: {
    noResults: Object,
    recipeOrShoppingList: String,
  },
  computed: {
    loaded() {
      if (this.recipeOrShoppingList == "recipe") {
        return this.$store.state.recipesReady;
      } else {
        return this.$store.state.shoppingListsReady;
      }
    },
    asd() {
      console.log(this.noResults);
      return this.noResults;
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.cardM,
.cardS {
  background-color: white;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
  transition: all 0.2s ease-in-out;

  &:hover svg,
  &:focus svg {
    transition: 4s;
    transform: rotate(360deg);
  }
}

.Layer_1,
.fa-arrow-up {
  width: 100%;
  height: 100%;
  transition: 4s;
}

.Layer_1 > * {
  color: #4a8ee7;
}

.noResultCard-body {
  position: relative;
  height: calc(100% - 200px);
  box-sizing: border-box;
  word-break: break-word;
}

.cardS {
  width: 13em;

  .noResultCard-body {
    padding: 0.8em 0.5em 0em 0.5em;
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
