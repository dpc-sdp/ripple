import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      SITEID: 8888
    }
  },
  tide: {
    contentApi: {
      site: '8888',
      baseUrl: process.env.CONTENT_API_SERVER,
      apiPrefix: 'api/v1',
      auth: {
        username: 'dpc',
        password: 'sdp'
      }
    },
    mapping: {
      content: {
        event: '@dpc-sdp/ripple-tide-event',
        grant: '@dpc-sdp/ripple-tide-grant',
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        media: '@dpc-sdp/ripple-tide-media'
      },
      site: '@dpc-sdp/ripple-tide-api/mapping/site'
    },
    debug: false
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  modules: [
    '@dpc-sdp/ripple-tide-api/nuxt',
    '@dpc-sdp/ripple-tide-grant/nuxt',
    '@dpc-sdp/ripple-tide-landing-page/nuxt',
    '@dpc-sdp/ripple-tide-media/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
