<template>
  <h2>Ingredients</h2>
  <h4> {{ingredients.length}} ingredients </h4>
  <ul class="ingredients">
    <li v-for="ingredient in ingredients" :key="ingredient.name"> {{ ingredient.amount + " " + ingredient.name }} </li>
  </ul>
</template>

<script>
export default {
  name: "ingredients",
  data() {
    return {
      ingredients: [
        { amount: "4 Port", name: "Pasta" },
        { amount: "1 dl", name: "Hackad lök" },
        { amount: "1 msk", name: "Smör eller olja" },
        { amount: "2 + 1/2 dl", name: "Matlagningsgrädde" },
        { amount: "1 + 1/2 dl", name: "Mjölk" },
        { amount: "2 tsk", name: "Majsstärkelse" },
        { amount: "2 Förp // 360 gram", name: "Strimlad SKinka" },
        { amount: "1 + 1/2 dl", name: "Riven smakrik ost" },
        { amount: "", name: "Salt" },
        { amount: "", name: "Peppar" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h2, h4 {
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
