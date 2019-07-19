// Custom tide config & filters.
const tideConfig = require('./tide/tide.config')
const tideFilters = require('./tide/tide.mapping-filters')

require('dotenv').config()

process.env.DEBUG = 'nuxt:*' // display nuxt.js logs

export default {

  /*
  ** Headers of the page
  */
  head: {
    title: '<%= name %>',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: '<%= description %>' }
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
      <% if (siteModule === 'yes') { %> site: 1,<%}%>
      // Content types
      <% if (pageModule === 'yes') { %> page: 1,<%}%>
      <% if (landingPageModule === 'yes') { %> landingPage: 1,<%}%>
      <% if (eventModule === 'yes') { %> event: 1,<%}%>
      <% if (newsModule === 'yes') { %> news: 1,<%}%>
      <% if (grantModule === 'yes') { %> grant: 1,<%}%>
      <% if (profileModule === 'yes') { %> profile: 1,<%}%>
      <% if (publicationModule === 'yes') { %> publication: 1,<%}%>
      // Feature flags
      <% if (mediaModule === 'yes') { %> media: 1,<%}%>
      <% if (webformModule === 'yes') { %> webform: 1,<%}%>
      <% if (searchModule === 'yes') { %> search: 1,<%}%>
      <% if (monsidoModule === 'yes') { %> monsido: 1,<%}%>
      <% if (authenticatedContentModule === 'yes') { %> authenticatedContent: 1,<%}%>
      <% if (dataDrivenComponentModule === 'yes') { %> dataDrivenComponent: 1,<%}%>
      <% if (alertModule === 'yes') { %> alert: 1,<%}%>
      <% if (gtmModule === 'yes') { %> gtm: 1,<%}%>
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
