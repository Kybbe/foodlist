<template>
  <div id="content">
    <HelloWorld />

    <div class="bigCard card">
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
import HelloWorld from "./components/HelloWorld.vue";
import mainArea from "./components/mainArea.vue";
import recipe from "./components/recipe.vue";
import ingredients from "./components/ingredients.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    mainArea,
    recipe,
    ingredients,
  },
};
</script>

<style lang="scss">
:root {
  --background-color: white;
  --card-color: rgba(0, 0, 0, 0.01);
  --text-color: black;
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
}

.header {
  width: 100%;
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
    width: 95%
  }

  .mediumCard {
    width: 45%;
  }

  .smallCard {
    width: 32%;
  }
}
</style>
