<template>
  <div id="footerBar">
    <h1>Techniques used</h1>
    <div id="footerLists">
      <ul>
        <h4>Vue:</h4>
        <li>Vue 3</li>
        <li>Vue router</li>
        <li>Vite</li>
      </ul>

      <ul>
        <h4>Firebase:</h4>
        <li>Firebase Authentication</li>
        <li>Firebase Realtime database</li>
        <li>Firebase Hosting</li>
      </ul>
    </div>
    <div style="text-align: center">
      <h2>Font awesome</h2>
      <p>Font awesome was used for various svg icons.</p>
      <p>The icons are not changed or altered.</p>
      <a href="https://fontawesome.com/license">Font awesome license</a>
    </div>
    <div class="version-info">
      <p>Version: {{ version }} | Build: {{ buildTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerBar",
  computed: {
    version() {
      return typeof __APP_VERSION__ !== "undefined"
        ? __APP_VERSION__
        : "unknown";
    },
    buildTime() {
      if (typeof __BUILD_TIME__ !== "undefined") {
        const date = new Date(__BUILD_TIME__);
        return date.toLocaleString();
      }
      return "unknown";
    },
  },
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
  word-break: break-word;
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

.version-info {
  text-align: center;
  font-size: 0.85em;
  color: #666;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.version-info p {
  margin: 5px 0;
}
</style>
