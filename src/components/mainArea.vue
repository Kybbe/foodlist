<template>
  <div id="descriptionContainer">
    <h2>{{ title }}</h2>
    <p class="description">{{ description }}</p>
  </div>
  <div id="imgContainer">
    <img :src="imgLinkAndTemplate" alt="image of the dish" />
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
  data() {
    return {
      templateImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
      imgLinkAndTemplate: "",
    };
  },
  mounted() {
    if (this.imgLink == "") {
      this.imgLinkAndTemplate = this.templateImg;
    } else {
      this.imgLinkAndTemplate = this.imgLink;
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

h2 {
  width: 100%;
  text-align: center;
  margin: 5px 0px 5px 0px;
  font-size: 2.25em;
}

#descriptionContainer {
  width: 100%;
  padding: 10px;
}

#imgContainer {
  width: 100%;

  img {
    width: calc(100% - 20px);
    border-radius: 5px;
    margin: 0 10px;
  }
}

@media (min-width: 800px) {
  #descriptionContainer,
  #imgContainer {
    padding: 20px;
  }

  #descriptionContainer {
    width: 50%;
    border-right: 1px solid rgba(128, 128, 128, 0.4);
    font-size: 1.3em;
  }

  #imgContainer {
    width: 50%;

    img {
      margin: 0px !important;
    }
  }
}
</style>
