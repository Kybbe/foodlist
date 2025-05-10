import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

createApp(App)
	.use(router)
	.use(store)
	.use(PrimeVue, {
		theme: {
			preset: "Aura",
		},
	})
	.mount("#app");
