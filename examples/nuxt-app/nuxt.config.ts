import 'dotenv/config'
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
  modules: [
    '@dpc-sdp/ripple-tide-api/nuxt',
    '@dpc-sdp/ripple-tide-grant/nuxt',
    '@dpc-sdp/ripple-tide-landing-page/nuxt',
    '@dpc-sdp/ripple-tide-media/nuxt',
    '@dpc-sdp/ripple-tide-publication/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
