import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: ''
    }
  },
  modules: ['@dpc-sdp/ripple-tide-api/nuxt', '@dpc-sdp/ripple-tide-search/nuxt']
})
