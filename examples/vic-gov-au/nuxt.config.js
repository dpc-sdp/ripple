require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs
process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.

export default {

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
  ** Set the loading bar color
  * https://nuxtjs.org/api/configuration-loading
  */
  loading: { color: '#0095EC' },
  /*
   * Router
   * https://nuxtjs.org/api/configuration-router
   * You can use this to add routes programmatically. Note nuxt-tide adds its own routes which may conflict.
   */
  router: {
  },
  /*
  ** Modules
  * https://nuxtjs.org/guide/modules
  */
  modules: [
    // https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide
    '@dpc-sdp/ripple-nuxt-tide',
    // we want to always disallow bots on the example site
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/'
    }]
  ],
  /*
  ** styleResources
  * Override the path to the theme customisation scss
  * loads scss with @nuxtjs/style-resources
  * Defaults to /assets/_theme.scss
  */
  // styleResources: {
  //   scss: [
  //     path.resolve(__dirname, './assets/_theme.scss')
  //   ]
  // }
  /*
  * Configuration for ripple-nuxt-ui
  * See https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui
  */
  ripple: {},
  /*
  * Configuration for ripple-nuxt-tide
  * See https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide
  */
  tide: {
    baseUrl: 'https://no.this.server',
    auth: {
      username: process.env.CONTENT_API_AUTH_USER,
      password: process.env.CONTENT_API_AUTH_PASS
    },
    site: 4,
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
      authenticatedContent: 1,
      dataDrivenComponent: 1,
      alert: 1,
      gtm: 1
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
      }
    }
  }
}
