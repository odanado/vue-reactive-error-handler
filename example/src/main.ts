import Vue from "vue";
import App from "./App.vue";

import { ReactiveErrorHandler } from "vue-reactive-error-handler";

Vue.use(ReactiveErrorHandler);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
