<template>
  <div id="descriptionContainer">
    <h2>{{ title }}</h2>
    <p class="description">{{ description }}</p>
  </div>
  <div id="imgContainer">
    <img
      src="../assets/pasta_med_kramig_ost-_och_skinksas.jpg"
      alt="image of the dish"
    />
  </div>
</template>

<script>
export default {
  name: "mainArea",
  data() {
    return {
      title: "Pasta med ost- och skinksås",
      description:
        "Ibland vill man bara fixa ihop en enkel men god pasta till middag! Då har du denna krämiga pastarätt med ost- och skinksås. Prästost ger en perfekt smak till såsen, och du adderar gräslök och tomater på toppen innan servering!",
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  width: 100%;
  text-align: center;
  margin: 5px 0px 5px 0px;
}

#descriptionContainer {
  width: 100%;

  p {
    height: 100%;
  }
}

#imgContainer {
  width: 100%;

  img {
    width: 100%;
    border-radius: 5px;
  }
}

@media (min-width: 800px) {
  #descriptionContainer, #imgContainer {
    padding: 20px;
  }

  #descriptionContainer {
    width: calc(60% - 42px);
    border-right: 1px solid rgba(128, 128, 128, 0.4);
  }

  #imgContainer {
    width: calc(40% - 40px);
  }
}
</style>
