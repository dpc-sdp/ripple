import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        // These can be overridden via environment variables eg: NUXT_PUBLIC_TIDE_BASE_URL
        // See https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig for more info
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        site: '8888',
        appSearch: {
          searchKey: '',
          endpointBase: '',
          engineName: ''
        },
        elasticsearch: {
          host: '',
          index: ''
        }
      }
    }
  },
  // See https://nuxt.com/docs/getting-started/layers - each content type is a added as a Nuxt layer
  extends: [
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/nuxt-ripple-preview',
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-grant',
    '@dpc-sdp/ripple-tide-publication',
    '@dpc-sdp/ripple-tide-media',
    '@dpc-sdp/ripple-tide-news',
    '@dpc-sdp/ripple-tide-search'
  ]
})
