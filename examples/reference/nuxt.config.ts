import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  privateRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    SITEID: 4
  },
  buildModules: ['@dpc-sdp/ripple-ui-core/nuxt']
})
