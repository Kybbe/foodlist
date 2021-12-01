<template>
  <navbar :link="link" />
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
      <mainArea :title="title" :description="description" :imgLink="imgLink" />
    </div>

    <div class="mediumCard card">
      <ingredients :ingredients="ingredients" />
    </div>

    <div class="mediumCard card">
      <recipe :instructions="instructions" />
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
  data: function () {
    return {
      title: "Pasta med ost- och skinksås",
      description:
        "Ibland vill man bara fixa ihop en enkel men god pasta till middag! Då har du denna krämiga pastarätt med ost- och skinksås. Prästost ger en perfekt smak till såsen, och du adderar gräslök och tomater på toppen innan servering!",
      instructions: [
        {
          id: 0,
          checked: false,
          text: "Koka pastan enligt anvisningen på förpackningen.",
        },
        {
          id: 1,
          checked: false,
          text: "Blanda i grädden och majsstärkelsen utrörd i mjölken. Koka upp under upprörning. Rör i skinkan och osten och låt allt bli varmt. Smaka av med salt och peppar.",
        },
        { id: 2, checked: false, text: "Skär tomaterna och hacka gräslöken." },
        {
          id: 3,
          checked: false,
          text: "Servera pastan med ost- och skinksåsen, tomater och gräslök.",
        },
      ],
      ingredients: [
        { amount: 4, measurment: "Portioner", name: "Pasta" },
        { amount: 1, measurment: "msk", name: "Smör eller olja" },
        { amount: 2.5, measurment: "dl", name: "Matlagningsgrädde" },
        { amount: 1.5, measurment: "dl", name: "Mjölk" },
        { amount: 2, measurment: "tsk", name: "Majsstärkelse" },
        { amount: 2, measurment: "Förpackningar", name: "Strimlad Skinka" },
        { amount: 1.5, measurment: "dl", name: "Riven smakrik ost" },
        { amount: "", measurment: "", name: "Salt" },
        { amount: "", measurment: "", name: "Peppar" },
      ],
      link: "https://www.ica.se/recept/pasta-med-kramig-ost-och-skinksas-725815/",
      imgLink:
        "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg",
    };
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
