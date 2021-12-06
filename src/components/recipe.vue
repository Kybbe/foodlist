<template>
  <navbar :link="recipe[currentRecipeId].link" />
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
      <mainArea
        :title="recipe[currentRecipeId].title"
        :description="recipe[currentRecipeId].description"
        :imgLink="recipe[currentRecipeId].imgLink"
      />
    </div>

    <div class="mediumCard card">
      <ingredients :ingredients="recipe[currentRecipeId].ingredients" />
    </div>

    <div class="mediumCard card">
      <instruction :instructions="recipe[currentRecipeId].instructions" />
    </div>
  </div>
</template>

<script>
import mainArea from "./mainArea.vue";
import instruction from "./instructions.vue";
import ingredients from "./ingredients.vue";
import Navbar from "./navbar.vue";

export default {
  name: "recipe",
  components: {
    mainArea,
    instruction,
    ingredients,
    Navbar,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      currentRecipeId: this.$route.params.id,
    }
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

#content {
  display: flex;
  flex-wrap: wrap;

  max-width: 75em;
  margin: 0 auto;
}

.card {
  padding: 10px;
  width: 100%;
  margin: 7px auto 7px auto;
}

.bigCard img {
  width: calc(100% - 20px);
  margin: 0px 10px;
}

.mediumCard {
  background-color: var(--card-color);
}

@media (min-width: 800px) {
  #content {
    padding: 10px;
  }

  .card {
    border-radius: 10px;
    background-color: var(--card-color);
    border: solid rgb(192, 192, 192) 1px;
    height: 100%;
  }

  .bigCard {
    width: 100%;
  }

  .bigCard img {
    margin: 0px;
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
