const path = require('path')

module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'publication-print-all',
      path: '/:publicationname/print-all',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/publication/pages/PrintAll.vue'
    })
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/router-middleware.js'),
    fileName: './router-middleware.js'
  })
}
