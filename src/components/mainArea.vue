<template>
  <div id="descriptionContainer">
    <h2>{{ title }}</h2>
    <p class="description">{{ description }}</p>
  </div>
  <div id="imgContainer">
    <img :src="imgLink" alt="image of the dish" />
  </div>
</template>

<script>
export default {
  name: "mainArea",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgLink: {
      type: String,
      required: true,
    },
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
  #descriptionContainer,
  #imgContainer {
    padding: 20px;
  }

  #descriptionContainer {
    width: calc(50% - 42px);
    border-right: 1px solid rgba(128, 128, 128, 0.4);
    font-size: 1.3em;
  }

  #imgContainer {
    width: calc(50% - 40px);
  }
}
</style>
