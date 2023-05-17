import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    tide: {
      preview: {
        clientId: '',
        cookieSignSecret: ''
      }
    }
  }
})
