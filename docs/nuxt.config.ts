import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@dpc-sdp/ripple-ui-core/nuxt', '@nuxt/content'],
  target: 'static'
})
