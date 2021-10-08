<template>
  <h2>{{ title }}</h2>
  <img src="../assets/pasta_med_kramig_ost-_och_skinksas.jpg" alt="image of the dish" />
  <p class="description"> {{ description }} </p>
</template>

<script>
export default {
  name: "mainArea",
  data() {
    return {
      title: "Pasta med ost- och skinksås",
      description: "Ibland vill man bara fixa ihop en enkel men god pasta till middag! Då har du denna krämiga pastarätt med ost- och skinksås. Prästost ger en perfekt smak till såsen, och du adderar gräslök och tomater på toppen innan servering!",
    };
  },
};
</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
    margin: 0px 0px 5px 0px;
  }
</style>
