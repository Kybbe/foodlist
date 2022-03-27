<template>
  <navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<script>
import navbar from "./components/navbar.vue";
export default {
  name: "App",
  components: {
    navbar,
  },
};
</script>

<style lang="scss">
html {
  min-height: 100vh;
}

body {
  background-color: #f5f5f5;

  scroll-behavior: smooth;

  min-height: 100vh;
  width: 100%;
  margin: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
