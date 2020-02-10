require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs
process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.

export default {

  /*
  ** Headers of the page
  */
  head: {
    title: 'basic-examples',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: 'Example site for showing how to add custom work' }
    ],
    link: [
      // Load custom fonts from Google fonts
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald&display=swap' }
    ]
  },
  modules: [
    '@dpc-sdp/ripple-nuxt-tide'
  ],
  /*
  ** Css
  * https://nuxtjs.org/api/configuration-css/
  */
  css: [
    '@/assets/_custom.scss'
  ],
  build: {
    // For debugging in dev mode
    // https://github.com/nuxt/nuxt.js/issues/2734#issuecomment-410135071
    extend (config, { isDev, isClient }) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  ripple: {
    card: {
      trimFieldfonts: ['Oswald']
    }
  },
  tide: {
    baseUrl: process.env.CONTENT_API_SERVER,
    auth: {
      username: process.env.CONTENT_API_AUTH_USER,
      password: process.env.CONTENT_API_AUTH_PASS
    },
    site: '4',
    // Tide submodules, 1 for enable, 0 for disable.
    modules: {
      page: 1,
      landingPage: 1,
      media: 1,
      webform: 1,
      search: 1,
      alert: 1,
      site: 1
    },
    gtm: {
      // Set Google Tag Manager ID here
      id: process.env.GTM_ID
    },
    search: {
      service: process.env.SEARCH_SERVICE,
      index: process.env.SEARCH_INDEX,
      url: 'https://' + process.env.SEARCH_HASH + '.' + process.env.SEARCH_URL,
      log: process.env.SEARCH_LOG,
      auth: {
        username: process.env.SEARCH_AUTH_USERNAME,
        password: process.env.SEARCH_AUTH_PASSWORD
      },
      loadOnDemand: 1
    }
  }
}
