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
      },
      ripple: {
        hostname: ''
      }
    }
  },
  tide: {
    mapping: {
      content: {
        event: '@dpc-sdp/ripple-tide-event',
        grant: '@dpc-sdp/ripple-tide-grant',
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        media: '@dpc-sdp/ripple-tide-media',
        publication: '@dpc-sdp/ripple-tide-publication',
        news: '@dpc-sdp/ripple-tide-news'
      },
      site: '@dpc-sdp/ripple-tide-api/mapping/site'
    },
    debug: false
  },
  modules: [
    '@dpc-sdp/ripple-tide-api/nuxt',
    '@dpc-sdp/ripple-tide-grant/nuxt',
    '@dpc-sdp/ripple-tide-landing-page/nuxt',
    '@dpc-sdp/ripple-tide-media/nuxt',
    '@dpc-sdp/ripple-tide-publication/nuxt',
    '@dpc-sdp/ripple-tide-news/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
