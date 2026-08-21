import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .use(ToastService);

const toast = app.config.globalProperties.$toast;
const addToast = toast.add.bind(toast);
toast.add = (message) => {
  const withDefaultLife = (toastMessage) => ({
    ...toastMessage,
    life: toastMessage.life ?? 5000,
  });

  addToast(
    Array.isArray(message)
      ? message.map(withDefaultLife)
      : withDefaultLife(message)
  );
};

app.mount("#app");
