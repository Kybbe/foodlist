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
		drink: {
			type: Boolean,
		},
	},
	data() {
		return {
			templateImg:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
			drinkTemplateImg:
				"https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg",
			imgLinkAndTemplate: "",
		};
	},
	mounted() {
		//if imagelink does not start with http or https, check if a relative link to the image is provided
		//if not, use the template image
		if (
			this.imageLink &&
			!this.imageLink.startsWith("http") &&
			!this.imageLink.startsWith("https")
		) {
			this.imgLink = require(`@/assets/${this.imageLink}`);
		}

		if (this.imgLink === "") {
			if (this.drink) {
				this.imgLinkAndTemplate = this.drinkTemplateImg;
			} else {
				this.imgLinkAndTemplate = this.templateImg;
			}
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
      width: 100%;
      height: 100%;
    }
  }
}
</style>
