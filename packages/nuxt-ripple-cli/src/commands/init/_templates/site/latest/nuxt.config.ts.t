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
    '@dpc-sdp/ripple-sdp-core'
    // Custom layers
  ]
})
