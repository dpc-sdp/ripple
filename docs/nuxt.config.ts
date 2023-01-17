import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@nuxt-themes/config/module',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
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
  },
  app: {
    theme: {
      meta: {
        name: 'Ripple Docs',
        author: 'Single Digital Presence Team',
        description:
          'A lightweight Nuxt theme to build a Markdown driven website, based on Nuxt Content, TailwindCSS and Iconify ✨'
      }
    }
  }
})
