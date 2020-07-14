import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/assets/css/app.css"

// importo interceptores para enviar y actualizar el token
import './services/interceptors'

export const URL_API = process.env.VUE_APP_URL_API;

Vue.config.productionTip = false;

store.dispatch("getUser")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
