import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/lib/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { router } from "./app/router";
import en from "./shared/locales/en";
import ru from "./shared/locales/ru";
import { store } from "./app/store"; // Импорт стора

import "@mdi/font/css/materialdesignicons.css";

import { createI18n } from "vue-i18n";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  messages: {
    en,
    ru,
  },
});

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .use(store)
  .use(Toast, {})
  .mount("#app");
