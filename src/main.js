import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

const buildVersionStorageKey = "foodlist:build-version";

const notifyAboutAppUpdate = (toast) => {
  if (typeof window === "undefined" || typeof __APP_VERSION__ === "undefined") {
    return;
  }

  try {
    const previousVersion = window.localStorage.getItem(buildVersionStorageKey);
    window.localStorage.setItem(buildVersionStorageKey, __APP_VERSION__);

    if (previousVersion && previousVersion !== __APP_VERSION__) {
      toast.add({
        group: "app-update",
        severity: "success",
        summary: "Page updated",
        life: 3000,
        closable: false,
      });
    }
  } catch {
    return;
  }
};

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
notifyAboutAppUpdate(toast);
