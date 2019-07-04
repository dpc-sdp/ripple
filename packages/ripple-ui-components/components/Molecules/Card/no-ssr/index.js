// As some component can not be used in server side rendering, we export them here.
// Provide a plugin which others can use it in Nuxt as no ssr mode.
// Usage in Nuxt: https://nuxtjs.org/guide/plugins/#client-side-only

import RplCardCarousel from './CardCarousel.vue'

const install = Vue => {
  Vue.component('rplCardCarousel', RplCardCarousel)
}

export default {
  install
}

export { RplCardCarousel }
