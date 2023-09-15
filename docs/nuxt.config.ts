import { defineNuxtConfig } from 'nuxt/config'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
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
      theme: 'github-light',
      preload: ['vue', 'bash', 'markdown']
    }
  },
  vite: {
    plugins: [ViteYaml()]
  },
  nitro: {
    prerender: {
      ignore: ['/storybook']
    }
  }
})
