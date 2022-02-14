import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt3'
import siteMapping from './tide/site'
import event from './tide/event'

export default defineNuxtConfig({
  privateRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    SITEID: 4
  },
  tide: {
    debug: true,
    site: 4,
    baseUrl: 'https://master.content.vic.gov.au/',
    apiPrefix: 'api/v1',
    auth: {
      username: 'dpc',
      password: 'sdp'
    },
    contentTypes: {
      event
    },
    siteMapping
  },
  modules: ['@dpc-sdp/ripple-tide-api/nuxt'],
  buildModules: ['@dpc-sdp/ripple-ui-core/nuxt']
})
