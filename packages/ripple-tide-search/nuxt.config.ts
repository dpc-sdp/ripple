import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  build: {
    transpile: ['@elastic/search-ui', '@elastic/search-ui-app-search-connector']
  }
})
