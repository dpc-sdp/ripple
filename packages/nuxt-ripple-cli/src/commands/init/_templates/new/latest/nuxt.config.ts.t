---
to: nuxt.config.ts
---

import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        contentApi: {
          // NOTE: These are default values and can be left as is.
          // These can be overridden via environment variables eg: NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL and NUXT_PUBLIC_TIDE_CONTENT_API_SITE instead
          // See https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig for more info
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au/',
          site: '8888'
        },
        appSearch: {
          searchKey: '',
          endpointBase: '',
          engineName: ''
        }
      }
    }
  },
  // See https://nuxt.com/docs/getting-started/layers - each Ripple content type is a added as a Nuxt layer
  extends: [
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-grant',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-publication',
    '@dpc-sdp/ripple-tide-media',
    '@dpc-sdp/ripple-tide-news',
    '@dpc-sdp/ripple-tide-search'
  ]
})
