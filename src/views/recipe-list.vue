<template>
  <div style="text-align: center; background-color: lightblue">
    <h1>Recipes:</h1>
  </div>
  <div class="cardList">
    <div
      class="long-card"
      v-for="partOfList in recipesList"
      :key="partOfList.title"
    >
      <router-link :to="'/recipe/' + partOfList.recipeId">
        <div class="backgroundIMG"></div>
        <div class="textPart">
          <h2>{{ partOfList.title }}</h2>
          <p>{{ partOfList.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  props: {
    recipesList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 0px;
}

.cardList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.long-card {
  width: calc(100% - 20px);
  max-width: 400px;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}

.backgroundIMG {
  background-image: url("https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.6;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: inherit;
  filter: saturate(70%);
}

.textPart {
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(1px);
  background-color: rgba(255, 255, 255, 0.4);
  width: calc(100% - 20px);
  height: calc(100% - 20px);

  h2 {
    text-align: center;
    margin: 0;
    margin-bottom: 4px;
  }

  p {
    //max-height: calc(3.6em + 32px);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0px;
  }
}

a {
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
}
</style>
