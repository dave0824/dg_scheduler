// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import axios from 'axios'
import Qs from 'qs'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

// 导入axios
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  axios,
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
