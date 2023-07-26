---
to: .playground/nuxt.config.ts
---
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // These can be overridden via environment variables eg: NUXT_PUBLIC_TIDE_BASE_URL
  // Check the layer readme files for the available runtimeConfig options
  // See https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig for more info
  runtimeConfig: {
    public: {
      siteUrl: '',
      apiUrl: '',
      tide: {
        baseUrl: '',
        site: '',
        menuEndpoint: ''
      }
    }
  },
  // See https://nuxt.com/docs/getting-started/layers - each content type is added as a Nuxt layer
  extends: [
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/nuxt-ripple-analytics',
    '@dpc-sdp/nuxt-ripple-preview',
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-topic',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-grant',
    '@dpc-sdp/ripple-tide-publication',
    '@dpc-sdp/ripple-tide-media',
    '@dpc-sdp/ripple-tide-news',
    '@dpc-sdp/ripple-tide-search',
    '..'
  ]
})
