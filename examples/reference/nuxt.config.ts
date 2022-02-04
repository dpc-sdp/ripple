process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.
require('dotenv').config()

import { NuxtConfig } from '@nuxt/types'

const SITEID = 4

const config: NuxtConfig = {
  privateRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    SITEID
  },
  modules: [
    '@dpc-sdp/ripple-nuxt',
    ['@dpc-sdp/ripple-tide-api', {
      contentTypes: {
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        publication: '@dpc-sdp/ripple-tide-publication',
        publication_page: '@dpc-sdp/ripple-tide-publication',
        event: '@dpc-sdp/ripple-tide-event',
        grant: '@dpc-sdp/ripple-tide-grant'
      },
      siteMapping: '/tide-api/site',
      debug: process.env.NODE_ENV === 'development',
      apiBase: 'tide-api',
      tide: {
        apiPrefix: 'api/v1',
        site: 4,
        baseUrl: process.env.CONTENT_API_SERVER,
        auth: {
          username: 'dpc',
          password: 'sdp'
        }
      },
      validateResponses: false
    }]
  ],
  buildModules: ['@nuxt/typescript-build']
}

export default config