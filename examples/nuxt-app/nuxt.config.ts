import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        contentApi: {
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          site: '8888'
        }
      }
    }
  },
  extends: ['./../../packages/nuxt-ripple']
})
