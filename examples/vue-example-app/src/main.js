import Vue from 'vue'
import App from './App.vue'
import RplGlobal from '@dpc-sdp/ripple-global'

// Install Ripple Global plugin
const rplOptions = {
  // Your custom options
  // https://github.com/dpc-sdp/ripple/tree/develop/packages/components/Atoms/Global#rploptions
  rplMarkup: { plugins: [] }
}
Vue.use(RplGlobal, rplOptions)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
