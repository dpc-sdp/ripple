import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        config: {
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          site: '8888',
          apiPrefix: '/api/v1',
          auth: {
            username: 'dpc',
            password: 'sdp'
          }
        }
      },
      API_URL: ''
    }
  },
  proxy: {
    options: {
      target: 'https://develop.content.reference.sdp.vic.gov.au',
      changeOrigin: true,
      pathRewrite: {
        '^/api/tide/': '/api/v1/'
      },
      pathFilter: ['/api/tide/webform_submission/**']
    }
  },
  robots: {
    configPath: resolve('./robots.config.ts')
  },
  modules: [
    'nuxt-proxy',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@nuxtjs/robots'
  ]
})
