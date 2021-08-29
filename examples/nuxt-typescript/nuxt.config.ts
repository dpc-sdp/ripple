process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.
require('dotenv').config()

import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  privateRuntimeConfig: {
    API_URL: <string> process.env.API_URL || '/tide-api/v2',
  },
  publicRuntimeConfig: {
    SITEID: '4'
  },
  modules: [
    '@dpc-sdp/ripple-nuxt',
    ['@dpc-sdp/ripple-tide-api', {
      modules: {
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        grant: require.resolve('./tide-api/grant')
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