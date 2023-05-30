---
to: nuxt.config.ts
---

import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  // These can be overridden via environment variables eg: NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL
  // See https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig for more info
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        contentApi: {
          baseUrl: '',
          site: ''
        },
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
    '@dpc-sdp/nuxt-ripple-analytics',
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-grant',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-publication',
    '@dpc-sdp/ripple-tide-media',
    '@dpc-sdp/ripple-tide-news',
    '@dpc-sdp/ripple-tide-search'
  ]
})
