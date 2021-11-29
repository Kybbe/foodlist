<template>
  <navbar />
  <div id="content">
    <div
      class="bigCard card"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 0px;
      "
    >
      <mainArea />
    </div>

    <div class="mediumCard card">
      <ingredients />
    </div>

    <div class="mediumCard card">
      <recipe />
    </div>
  </div>
</template>

<script>
import mainArea from "./components/mainArea.vue";
import recipe from "./components/recipe.vue";
import ingredients from "./components/ingredients.vue";
import Navbar from "./components/navbar.vue";

export default {
  name: "App",
  components: {
    mainArea,
    recipe,
    ingredients,
    Navbar,
  },
};
</script>

<style lang="scss">
:root {
  --background-color: white;
  --card-color: rgba(0, 0, 0, 0.01);
  --text-color: black;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
}

#content {
  display: flex;
  flex-wrap: wrap;

  max-width: 75em;
  margin: 0 auto;
  padding: 10px;
}

.card {
  padding: 10px;
  width: 100%;
  margin: 7px auto 7px auto;
}

.bigCard img {
  width: 100%;
  aspect-ratio: 16/9;
}

.mediumCard {
  background-color: var(--card-color);
}

@media (min-width: 800px) {
  .card {
    border-radius: 10px;
    background-color: var(--card-color);
    border: solid rgb(192, 192, 192) 1px;
    height: 100%;
  }

  .bigCard {
    width: 100%;
  }

  .mediumCard {
    width: calc(50% - 32px);
    margin: 7px 0px;
  }

  .mediumCard:nth-child(2n) {
    margin-right: 20px;
  }

  .smallCard {
    width: 32%;
  }
}
</style>
