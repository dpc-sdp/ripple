const resolve = require('path').resolve

// Custom tide config & filters.
const tideConfig = require('./tide/tide.config')
const tideFilters = require('./tide/tide.mapping-filters')

require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs

export default {
  /*
  ** Display error details in Nuxt error page
  */
  debug: process.env.DISPLAY_ERROR === '1' || false,

  serverMiddleware: [
    process.env.BASIC_AUTH === '1' && '~/middleware/basic-auth'
  ].filter(i => i),

  /*
  ** Headers of the page
  */
  head: {
    title: 'vic.gov.au',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: 'vic.gov.au' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#0095EC' },
  /*
  ** Build configuration
  * TODO: move this to nuxt tide
  */
  build: {
    maxChunkSize: 300000,
    transpile: [/@dpc-sdp\/ripple/],
    extend (config, { isDev }) {
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm'
      // Run ESLint on save
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
  ],
  /*
   * Router
   * https://nuxtjs.org/api/configuration-router
   * You can use this to add routes programmatically. Note nuxt-tide adds its own routes which may conflict.
   */
  router: {
  },
  /*
  ** Modules
  */
  modules: [
    '@dpc-sdp/ripple-nuxt-tide',
    '@nuxtjs/style-resources',
    // we want to always disallow bots on the example site
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/'
    }]
  ],
  styleResources: {
    scss: [
      // Theme - Injects sass variables into components
      resolve(__dirname, './assets/_theme.scss')
    ]
  },
  ripple: {
    // Configure rplOptions here...
  },
  tide: {
    baseUrl: process.env.CONTENT_API_SERVER,
    auth: {
      username: process.env.CONTENT_API_AUTH_USER,
      password: process.env.CONTENT_API_AUTH_PASS
    },
    site: 4,
    customConfig: tideConfig,
    customFilters: tideFilters,
    // Tide submodules, 1 for enable, 0 for disable.
    modules: {
      site: 1,
      // Content types
      page: 1,
      landingPage: 1,
      event: 1,
      news: 1,
      grant: 1,
      profile: 1,
      publication: 1,
      // Other features
      media: 1,
      webform: 1,
      search: 1,
      monsido: 0,
      authenticatedContent: 1,
      dataDrivenComponent: 1,
      alert: 1,
      gtm: 1
    },
    gtm: {
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
      }
    }
  }
}
