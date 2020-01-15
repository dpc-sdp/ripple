import defaults from './config/defaults'
import * as configLoader from './core/config-loader'
const path = require('path')

const nuxtTide = function (moduleOptions) {
  const options = Object.assign(defaults, this.options.tide, moduleOptions)

  configLoader.build(options, this)

  this.options.proxy = {
    ...this.options.proxy,
    // Set the proxy timeout for requesting to Tide API as 9 seconds.
    // POST request to Tide normally need more than 5 seconds to get response.
    '/api/v1/': {
      target: options.baseUrl,
      proxyTimeout: 9000
    },
    '/sites/default/files/': {
      target: options.baseUrl,
      onProxyReq (proxyReq, req, res) {
        proxyReq.setHeader('X-SDP-REQUEST-LOCATION', 'tide')
      }
    }
  }

  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'tide.js',
    options: options
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/axios.js'),
    fileName: 'tide-axios.js'
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

  // https://toor.co/blog/nuxtjs-smooth-scrolling-with-hash-links/
  this.options.router.scrollBehavior = async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }

    const findEl = async (hash, x) => {
      return document.querySelector(hash) ||
        new Promise((resolve, reject) => {
          if (x > 50) {
            return resolve()
          }
          setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
        })
    }

    if (to.hash) {
      let elmnt = await findEl(to.hash)
      if (elmnt) {
        return window.scrollTo(0, elmnt.offsetTop)
      }
    }

    return { x: 0, y: 0 }
  }

  this.addServerMiddleware(require('./server-middleware/request-id'))
  // Log all server side requests
  this.addServerMiddleware(require('./server-middleware/request-log'))
  this.addServerMiddleware(require('./server-middleware/headers'))

  this.options.head.htmlAttrs = this.options.head.hasOwnProperty('htmlAttrs') ? this.options.head.htmlAttrs : this.options.head.htmlAttrs = { lang: 'en' }

  // Register `@nuxtjs/axios` module
  this.addModule(['@nuxtjs/axios', {
    debug: false,
    // Using proxy for Tide request https://axios.nuxtjs.org/options#proxy
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

  this.extendRoutes((routes, resolve) => {
    routes.push(
      {
        name: 'sitemap',
        path: '/sitemap',
        component: resolve(__dirname, './pages/Sitemap.vue')
      },
      {
        // Extends routes to add tide page wildcard route, routes added under /pages will still take precedence
        name: 'tide',
        path: '*',
        component: resolve(__dirname, './pages/Tide.vue')
      }
    )
  })
}

export default nuxtTide
