import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";

import store from "./store/index"; // short for @/store/index.js

createApp(App).use(router).use(store).mount("#app");
