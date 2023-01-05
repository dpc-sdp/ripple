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
  extends: [
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-grant'
  ]
})
