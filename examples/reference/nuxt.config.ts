import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'path'

export default defineNuxtConfig({
  privateRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    SITEID: 4
  }
})
