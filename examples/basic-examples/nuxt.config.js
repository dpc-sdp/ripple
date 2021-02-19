require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs
process.env.APP_ROOT_PATH = '.' // Set the example app root path, for this example app config only.

export default {

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | basic-examples',
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
    extend (config, { isDev, isClient }) {
      if (isDev) {
        // For debugging in dev mode
        // https://github.com/nuxt/nuxt.js/issues/2734#issuecomment-410135071
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }

      const webpack = require('webpack')
      const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
      config.plugins.push(new LodashModuleReplacementPlugin({
        caching: true,
        collections: true,
        paths: true,
        shorthands: true
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
  ripple: {
    card: {
      trimFieldfonts: ['Oswald']
    },
    customIcon: true
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
