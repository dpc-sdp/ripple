import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ['./../node_modules/@docus/docs-theme'],
  modules: ['@dpc-sdp/ripple-ui-core/nuxt', '@nuxt/content'],
  target: 'static',
  github: {
    repo: 'dpc-sdp/ripple-framework'
  }
})
