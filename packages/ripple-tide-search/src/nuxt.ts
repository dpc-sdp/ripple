import { defineNuxtModule, extendPages } from '@nuxt/kit'
import { resolve } from 'pathe'

export default defineNuxtModule({
  setup() {
    extendPages((pages) => {
      // Add /search page
      pages.push({
        name: 'Search',
        path: '/search',
        file: resolve(__dirname, './pages/search.vue')
      })
    })
  }
})
