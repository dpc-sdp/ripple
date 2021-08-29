process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.

export default {
  privateRuntimeConfig: {
    API_URL: process.env.API_URL || '/tide-api/v2',
  },
  publicRuntimeConfig: {
    SITEID: '4'
  },
  modules: [
    '@dpc-sdp/ripple-nuxt-ui',
    '@dpc-sdp/ripple-nuxt',
    ['@dpc-sdp/ripple-tide-api', {
      modules: {
        landing_page: '@dpc-sdp/ripple-tide-landing-page'
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
  ]
}
