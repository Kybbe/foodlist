<template>
  <div class="header">
    <router-link :to='"/"'>Home</router-link>
    <a :href="link" target="_blank">Original Recipe</a>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

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
  margin-bottom: 0px;
}

a {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #4a8ee7;
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
