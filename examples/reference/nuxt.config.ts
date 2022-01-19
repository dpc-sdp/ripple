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
    proxy: {
    '/sitemap.xml':
      process.env.CONTENT_API_SERVER + 'sitemap.xml?site=' + SITEID,
    '/sitemaps/**/sitemap.xml': {
      target: process.env.CONTENT_API_SERVER,
      pathRewrite: (path) => {
        return process.env.CONTENT_API_SERVER + path + '?site=' + SITEID
      }
    },
    '/sites/default/files/**/*': process.env.CONTENT_API_SERVER,
    '/oauth/token': {
      target: process.env.CONTENT_API_SERVER,
      onProxyReq(proxyReq, req, res) {
        // As oauth/token is a proxied request, this authorization header
        // for the nuxt site is not valid for the proxied target.
        // Not removing it will present an unauthorizable user prompt.
        proxyReq.removeHeader('authorization')
      }
    }
  },
  modules: [
    '@dpc-sdp/ripple-nuxt',
    ['@dpc-sdp/ripple-tide-api', {
      modules: {
        landing_page: '@dpc-sdp/ripple-tide-landing-page',
        event: '@dpc-sdp/ripple-tide-event',
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