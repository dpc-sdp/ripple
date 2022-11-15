import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        contentApi: {
          baseUrl:
            'https://nginx-php.pr-136.content-reference-sdp-vic-gov-au.sdp4.sdp.vic.gov.au/',
          // baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          // site: '8888'
          site: '8936'
        }
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
        publication_page: '@dpc-sdp/ripple-tide-publication-page'
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
    '@dpc-sdp/ripple-tide-publication-page/nuxt',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
