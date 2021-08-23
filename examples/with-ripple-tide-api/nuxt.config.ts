process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.
require('dotenv').config()

import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Define your configuration with auto-completion & type checking
  modules: [
    ['@dpc-sdp/ripple-tide-api', {
      modules: {
        landing_page: '/tide-api/landing_page'
      },
      debug: process.env.NODE_ENV === 'development',
      auth: {
        username: 'dpc',
        password: 'sdp'
      },
      tide: {
        apiPrefix: 'api/v1',
        site: 4,
        baseUrl: process.env.CONTENT_API_SERVER,
        auth: {
          username: 'dpc',
          password: 'sdp'
        }
      },
      siteMapping: '/tide-api/site',
      validateResponses: false
    }]
  ],
  buildModules: ['@nuxt/typescript-build']
}

export default config