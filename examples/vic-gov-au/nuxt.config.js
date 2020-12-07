require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs
process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.

export default {

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | vic.gov.au',
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
    }],
    '@nuxtjs/gtm'
  ],
  /*
  ** Build
  * https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev) {
        // For debugging in dev mode
        // https://github.com/nuxt/nuxt.js/issues/2734#issuecomment-410135071
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }

      const webpack = require('webpack')
      const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
      config.plugins.push(new LodashModuleReplacementPlugin({
        'caching': true,
        'collections': true,
        'paths': true,
        'shorthands': true
        // 'cloning': true,
        // 'currying': true,
        // 'exotics': true,
        // 'guards': true,
        // 'metadata': true,
        // 'deburring': true,
        // 'unicode': true,
        // 'chaining': true,
        // 'memoizing': true,
        // 'coercions': true,
        // 'flattening': true,
        // 'placeholders': true
      }))
      // Load moment 'en-au' locale only for performance.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You need to change it if your site is not in Australia.
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-au/))
    },

    // Currently lodash is mainly brought by Elastic search JS lib.
    // Below lodash optimization can be reviewed after we migrate to new ES JS client.
    babel: {
      plugins: [
        'lodash'
      ]
    }
  },
  gtm: {
    // Enable below two lines to debug in dev mode
    // enabled: true,
    // debug: true,
    id: process.env.GTM_ID,
    pageTracking: true,
    pageViewEventName: 'routeChange',
    noscript: false
  },
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
    baseUrl: process.env.CONTENT_API_SERVER,
    auth: {
      username: process.env.CONTENT_API_AUTH_USER,
      password: process.env.CONTENT_API_AUTH_PASS
    },
    site: '4',
    // Tide submodules, 1 for enable, 0 for disable.
    modules: {
      site: 1,
      // Content types
      page: 1,
      landingPage: 1,
      event: 1,
      news: 1,
      grant: 1,
      profile: {
        route: '/victorian-honour-roll-of-women',
        returnText: 'See all inductees'
      },
      publication: 1,
      // Other features
      media: 1,
      webform: 1,
      search: 1,
      authenticatedContent: 1,
      preview: 1,
      alert: 1
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
      loadOnDemand: 1 // 0 for previous load mode. If you have a custom search page before Ripple v1.5.7, you need small change your code to turn on this. A example: https://github.com/dpc-sdp/ripple/pull/630/files#diff-c797d3457e8f4ca26b5707a65bc76189R37
    },
    /*
     * This is the V2 API - See @dpc-sdp/ripple-tide-search-api for details
    */
    searchApi: {
      apiBase: 'search-api',
      apiVersion: 'v2',
      cacheAge: 30
    },
    cachePurgePattern: []
  }
}
