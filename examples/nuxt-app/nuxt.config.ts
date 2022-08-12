import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  privateRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    SITEID: 8888
  },
  tide: {
    contentApi: {
      site: '8888',
      baseUrl: 'https://develop.content.reference.sdp.vic.gov.au/',
      apiPrefix: 'api/v1',
      auth: {
        username: 'dpc',
        password: 'sdp'
      }
    },
    mapping: {
      content: {
        event: '@dpc-sdp/ripple-tide-event',
        landing_page: '@dpc-sdp/ripple-tide-landing-page'
      },
      site: './tide/site.mjs'
    },
    debug: false
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  formkit: {
    configFile:
      './../../node_modules/@dpc-sdp/ripple-ui-forms/dist/formkit.config.js'
  },
  modules: [
    '@dpc-sdp/ripple-tide-api/nuxt',
    '@dpc-sdp/ripple-tide-landing-page/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
