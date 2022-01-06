const appDir = require('app-root-path')

export default function rippleNuxt (moduleOptions) {
  const path = require('path')
  // transpile modules
  this.options.build.transpile.push(/@dpc-sdp\/ripple/)

  // // Load theme variables
  // const fs = require('fs')
  // const themePath = require.resolve(__dirname, `${appDir}/assets/_theme.scss`)
  // if (fs.existsSync(themePath) && !this.options.styleResources) {
  //   this.options.styleResources = {
  //     scss: [themePath]
  //   }
  // }
  // this.addModule('@dpc-sdp/ripple-nuxt-ui', true)
  // Add store
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/store.js'),
    fileName: 'ripple-store.js'
  })
  // Add ripple options
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/rpl-options.js'),
    fileName: 'ripple-options.js'
  })
  // Extend build
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

  // proxy: {
  //   '/sitemap.xml':
  //     process.env.CONTENT_API_SERVER + 'sitemap.xml?site=' + SITEID,
  //   '/sitemaps/**/sitemap.xml': {
  //     target: process.env.CONTENT_API_SERVER,
  //     pathRewrite: (path) => {
  //       return process.env.CONTENT_API_SERVER + path + '?site=' + SITEID
  //     }
  //   },
  //   '/sites/default/files/**/*': process.env.CONTENT_API_SERVER,
  //   '/api/v1/': {
  //     target: process.env.CONTENT_API_SERVER,
  //     proxyTimeout: 30000
  //   },
  //   '/oauth/token': {
  //     target: process.env.CONTENT_API_SERVER,
  //     onProxyReq(proxyReq, req, res) {
  //       // As oauth/token is a proxied request, this authorization header
  //       // for the nuxt site is not valid for the proxied target.
  //       // Not removing it will present an unauthorizable user prompt.
  //       proxyReq.removeHeader('authorization')
  //     }
  //   }
  // },

  // Layouts
  this.addLayout(path.resolve(__dirname, './layouts/default.vue'), 'default')
}
