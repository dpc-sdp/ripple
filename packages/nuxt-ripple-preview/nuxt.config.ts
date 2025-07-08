import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    tide: {
      preview: {
        clientId: '',
        cookieSignSecret: ''
      }
    }
  },
  nitro: {
    routeRules: {
      '/oauth/**': {
        headers: {
          'cache-control': `no-store`
        }
      },
      'api/tide/oauth': {
        headers: {
          'cache-control': `no-store`
        }
      },
      '/preview/**': {
        headers: {
          'cache-control': `no-store`
        }
      }
    }
  }
})
