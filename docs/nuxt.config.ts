import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtlabs/github-module'
  ],
  github: {
    repo: 'dpc-sdp/ripple-framework'
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['icon']
    },
    documentDriven: {
      layoutFallbacks: ['page']
    },
    highlight: {
      preload: ['vue', 'bash']
    }
  }
})
