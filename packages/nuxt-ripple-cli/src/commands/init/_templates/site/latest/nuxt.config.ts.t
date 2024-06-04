---
to: nuxt.config.ts
---
export default defineNuxtConfig({
  // See https://nuxt.com/docs/getting-started/layers - please add custom layers after the //custom layers comment
  extends: [
    // Core layers
    '@dpc-sdp/nuxt-ripple',
    '@dpc-sdp/nuxt-ripple-analytics',
    '@dpc-sdp/nuxt-ripple-preview',
    '@dpc-sdp/ripple-tide-webform',

    // Custom layers

    // Content types
    '@dpc-sdp/ripple-tide-event',
    '@dpc-sdp/ripple-tide-topic',
    '@dpc-sdp/ripple-tide-landing-page',
    '@dpc-sdp/ripple-tide-grant',
    '@dpc-sdp/ripple-tide-publication',
    '@dpc-sdp/ripple-tide-media',
    '@dpc-sdp/ripple-tide-news',
    '@dpc-sdp/ripple-tide-search',
    '@dpc-sdp/ripple-tide-webform'

  ]
})
