import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-component-meta',
    '@nuxtlabs/github-module'
  ],
  colorMode: {
    classSuffix: ''
  },
  github: {
    repo: 'dpc-sdp/ripple-framework'
  },
  nitro: {
    prerender: {
      routes: [
        // All component meta routes need prerendering
        '/api/component-meta/RplAlert',
        '/api/component-meta/RplAccordion'
      ]
    }
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
