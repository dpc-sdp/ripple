import * as configLoader from './core/config-loader'
const path = require('path')

const nuxtTide = function (moduleOptions) {
  const defaults = {
    baseUrl: '',
    auth: {
      username: null,
      password: null
    },
    site: false, // Set a site id if nuxt-tide-site installed.
    extendConfigs: [],
    extendFilters: [],
    customConfig: {},
    customFilters: {},
    pageTypes: [], // Dynamic Tide page type components importing.
    dynamicComponents: [], // Dynamic components importing for Tide mapping.
    middleware: [],
    markupPlugins: [],
    modules: {
      site: 0,
      page: 0,
      landingPage: 0,
      event: 0,
      grant: 0,
      news: 0,
      media: 0,
      webform: 0,
      search: 0,
      publication: 0,
      authenticatedContent: 0,
      dataDrivenComponent: 0,
      alert: 0,
      gtm: 0
    },
    search: {
      service: '',
      index: '',
      url: '',
      log: '',
      auth: {
        username: '',
        password: ''
      }
    }
  }

  const options = Object.assign(defaults, this.options.tide, moduleOptions)

  configLoader.build(options, this)

  this.options.proxy = {
    ...this.options.proxy,
    '/api/v1/': options.baseUrl,
    '/sites/default/files/': options.baseUrl
  }

  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'tide.js',
    options: options
  })

  if (process.env.BASIC_AUTH === '1') {
    const basicAuth = require('./core/basic-auth.js')
    this.addServerMiddleware(basicAuth)
  }

  this.addModule('@dpc-sdp/ripple-nuxt-ui', true)

  // Add request id
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/request-id.js'),
    fileName: './request-id.js'
  })
  this.options.router.middleware.push('request-id')
  this.addServerMiddleware(require('./server-middleware/request-id'))
  // Log all server side requests
  this.addServerMiddleware(require('./server-middleware/request-log'))

  this.options.head.htmlAttrs = this.options.head.hasOwnProperty('htmlAttrs') ? this.options.head.htmlAttrs : this.options.head.htmlAttrs = { lang: 'en' }

  this.addModule('@nuxtjs/proxy', true)

  this.addModule(['@nuxtjs/axios', {
    debug: false,
    proxy: true
  }])

  // Display error details in Nuxt error page
  this.options.debug = process.env.DISPLAY_ERROR === '1' || false

  // transpile @dpc-sdp modules
  this.options.build.transpile.push(/@dpc-sdp\/ripple/)
  this.options.build.maxChunkSize = 300000

  // transpile none node modules to support browsers like IE
  this.options.build.transpile.push(/winston-transport/)
  this.options.build.transpile.push(/winston-logstash-transport/)
  this.options.build.transpile.push(/logform/)
  // To support transpile unknown type of source code
  // https://babeljs.io/docs/en/options#sourcetype
  // https://github.com/webpack/webpack/issues/4039#issuecomment-498033015
  this.options.build.babel.sourceType = 'unambiguous'

  this.extendBuild((config, { isDev, isClient }) => {
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

    // To support Winston to work in Nuxt webpack.
    // https://webpack.js.org/configuration/node/
    if (isClient) {
      config.node = config.node || {}
      config.node.fs = 'empty'
      config.node.dgram = 'empty'
    }
  })

  // add default and error layouts
  this.addLayout(path.resolve(__dirname, './layouts/default.vue'), 'default')
  this.addLayout(path.resolve(__dirname, './layouts/minimal.vue'), 'minimal')
  this.options.ErrorPage = path.resolve(__dirname, './layouts/error.vue')

  // Extends routes to add tide page wildcard route, routes added under /pages will still take precedence
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tide',
      path: '*',
      component: resolve(__dirname, './pages/Tide.vue')
    })
  })
}

export default nuxtTide
