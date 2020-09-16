const path = require('path')

module.exports = function () {
  const options = this.options.tide

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'tide-authenticated-content.js',
    options: options
  })

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tideauthenticated_reset',
      path: '/user/reset/:id/:time/:hash',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/pages/Reset.vue'
    })
    // routes.push({
    //   name: 'tideauthenticated_login',
    //   path: '/login',
    //   component: '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/pages/Login.vue'
    // })
  })
}
