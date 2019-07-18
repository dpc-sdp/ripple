const path = require('path')
const fs = require('fs')
const kebabCase = require('lodash.kebabcase')

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
      monsido: 0,
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

  Object.keys(options.modules).forEach(tideModule => {
    if (options.modules[tideModule] === 1) {
      let config
      let mappingFilters
      let moduleHook

      const moduleName = kebabCase(tideModule)

      if (fs.existsSync(path.resolve(__dirname, `./../modules/${moduleName}`))) {
        // TODO : Make this dynamic
        switch (tideModule) {
          case 'event':
            config = require('./../modules/event/tide.config.js')
            mappingFilters = require('./../modules/event/mapping-filters.js')
            moduleHook = require('./../modules/event/module.js')
            break
          case 'grant':
            config = require('./../modules/grant/tide.config.js')
            moduleHook = require('./../modules/grant/module.js')
            break
          case 'profile':
            config = require('./../modules/profile/tide.config.js')
            moduleHook = require('./../modules/profile/module.js')
            break
          case 'page':
            config = require('./../modules/page/tide.config.js')
            break
          case 'landingPage':
            config = require('./../modules/landing-page/tide.config.js')
            moduleHook = require('./../modules/landing-page/module.js')
            mappingFilters = require('./../modules/landing-page/mapping-filters.js')
            break
          case 'news':
            config = require('./../modules/news/tide.config.js')
            mappingFilters = require('./../modules/news/mapping-filters.js')
            break
          case 'site':
            moduleHook = require('./../modules/site/module.js')
            break
          case 'search':
            moduleHook = require('./../modules/search/module.js')
            break
          case 'media':
            config = require('./../modules/media/tide.config.js')
            break
          case 'publication':
            config = require('./../modules/publication/tide.config.js')
            break
          case 'webform':
            mappingFilters = require('./../modules/webform/mapping-filters.js')
            break
          case 'authenticatedContent':
            moduleHook = require('./../modules/authenticated-content/module.js')
            break
          case 'dataDrivenComponent':
            config = require('./../modules/data-driven-component/tide.config.js')
            moduleHook = require('./../modules/data-driven-component/module.js')
            break
          case 'alert':
            moduleHook = require('./../modules/alert/module.js')
            break
          case 'gtm':
            moduleHook = require('./../modules/gtm/module.js')
            break
          default:
            break
        }
      }

      if (config) {
        options.extendConfigs.push(config)
      }

      if (mappingFilters) {
        options.extendFilters.push(mappingFilters)
      }
      if (moduleHook && typeof moduleHook === 'function') {
        moduleHook.call(this)
      }
    }
  })

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
    this.addServerMiddleware('./core/basic-auth.js')
  }

  this.addModule('@dpc-sdp/ripple-nuxt-ui', true)

  this.options.head.htmlAttrs = this.options.head.hasOwnProperty('htmlAttrs') ? this.options.head.htmlAttrs : this.options.head.htmlAttrs = { lang: 'en' }

  this.addModule('@nuxtjs/proxy', true)

  this.addModule(['@nuxtjs/axios', {
    debug: false,
    proxy: true
  }])

  // custom progress bar colour
  this.options.loading = { color: '#0095EC' }

  // Display error details in Nuxt error page
  this.options.debug = process.env.DISPLAY_ERROR === '1' || false

  // transpile @dpc-sdp modules
  this.options.build.transpile = [/@dpc-sdp\/ripple/]
  this.options.build.maxChunkSize = 300000

  this.extendBuild((config, { isDev }) => {
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
