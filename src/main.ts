
import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import store from './base/store/index.js'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store,
  render: h => h(App)
}).$mount('#app')
