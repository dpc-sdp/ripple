import Vue from 'vue'
import VueAnnouncer from 'vue-announcer'

export default ({ app }, inject) => {
  Vue.use(VueAnnouncer, {}, app.router)  
}