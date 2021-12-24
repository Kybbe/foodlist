<template>
  <div id="descriptionContainer">
    <h2>{{ title }}</h2>
    <p class="description">{{ description }}</p>
    <a v-if="this.link" :href="link" target="_blank" id="ogLink"
      >Original Recipe</a
    >
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
    link: {
      type: String,
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

    if (this.link != null) {
      document.getElementsByClassName("description")[0].style.marginBottom =
        "10px";
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
  position: relative;

  #ogLink {
    text-decoration: none;
    color: white;
    background-color: #4a8ee7;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
    display: inline-block;

    @media (min-width: 800px) {
      position: absolute;
      bottom: 20px;
    }
  }
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
