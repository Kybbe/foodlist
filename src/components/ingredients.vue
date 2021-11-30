<template>
  <h2>Ingredients</h2>
  <h4>{{ ingredients.length }} ingredients</h4>
  <ul class="ingredients">
    <li v-for="ingredient in ingredients" :key="ingredient.name">
      {{ ` ${ingredient.amount} ${ingredient.measurment} ${ingredient.name} ` }}
    </li>
  </ul>
  <button v-on:click=doubleIngredients() >Double the ingredients!</button>
</template>

<script>
export default {
  name: "ingredients",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    doubleIngredients() {
      this.ingredients.forEach((ingredient) => {
        ingredient.amount *= 2;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h2,
h4 {
  margin: 0;
  text-align: center;
}

h2 {
  margin-top: 10px;
  margin-bottom: 3px;
}

h4 {
  margin-bottom: 10px;
}

ul {
  padding: 0;
}

li {
  padding: 12px 24px;
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: white;
}
</style>
