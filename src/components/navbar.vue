<template>
  <div class="header">
    <a href="app.vue">Home</a>
    <a :href="link" target="_blank">Original Recipe</a>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      link: "https://www.ica.se/recept/pasta-med-kramig-ost-och-skinksas-725815/",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: space-evenly;
  border-bottom: 1px solid grey;
  box-shadow: 2px 2px 4px grey;
  background-color: var(--card-color);
  align-items: center;
  margin-bottom: 20px;
}

a {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: lightblue;
  color: black;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
