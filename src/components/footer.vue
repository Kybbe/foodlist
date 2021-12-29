<template>
  <div id="footerBar">
    <h1>Techniques used</h1>
    <div id="footerLists">
      <ul>
        <h4>Vue:</h4>
        <li>Vue 3</li>
        <li>Vue router</li>
        <li>Vue CLI</li>
      </ul>

      <ul>
        <h4>Firebase:</h4>
        <li>Firebase Authentication</li>
        <li>Firebase Realtime database</li>
        <li>Firebase Hosting</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerBar",
};
</script>

<style lang="scss" scoped>
#footerBar {
  background-color: white;
  padding: 20px 0px 20px 10px;
  margin-top: 20px;
  box-shadow: 0px -10px 10px 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
  bottom: 0px;
  position: relative;
}

#footerLists {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
}

ul {
  list-style-type: none;
  border-left: 2px solid #4a8ee7;
  padding-left: 8px;
  margin-bottom: 0px;
  margin-left: 20px;
}

h4 {
  margin: 0;
  margin-bottom: 0.7em;
}

h1 {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 3px;
}
</style>
