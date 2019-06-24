module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidegrants',
      path: '/grants',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/grant/pages/search.vue'
    })
  })
}
