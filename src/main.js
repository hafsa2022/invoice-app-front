import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createI18n } from "vue-i18n";
import en from "./locale/en.json";
import fr from "./locale/fr.json";

loadFonts();
const i18n = createI18n({
  locale:
    localStorage.getItem("lang") != null
      ? localStorage.getItem("lang")
      : localStorage.setItem("lang", "en"),
  messages: {
    en: en,
    fr: fr,
  },
});

createApp(App).use(router).use(store).use(vuetify).use(i18n).mount("#app");
