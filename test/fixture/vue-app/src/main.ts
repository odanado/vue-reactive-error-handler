import Vue from 'vue'
import App from './App.vue'

import { ReactiveErrorHandler } from "../lib"

Vue.use(ReactiveErrorHandler)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
