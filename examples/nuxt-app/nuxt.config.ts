import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: '',
      apiUrl: '',
      tide: {
        // These can be overridden via environment variables eg: NUXT_PUBLIC_TIDE_BASE_URL
        // Check the layer readme files for the available runtimeConfig options for each layer
        // See https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig for more info
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        site: '8888',
        menuEndpoint: 'single'
      }
    }
  },
  // See https://nuxt.com/docs/getting-started/layers - each content type is a added as a Nuxt layer
  extends: [
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/nuxt-ripple-analytics',
    '@dpc-sdp/nuxt-ripple-preview',
    '@dpc-sdp/ripple-sdp-core',
    // Local layers
    './layers/example-components',
    './layers/fixture-api',
    './layers/map-features',
    './layers/ripple-ui-forms-ext',
    './layers/example-data-driven-component'
  ],
  // Nuxt devtools
  sourcemap: true,
  devtools: {
    enabled: false
  }
})
