module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidewhatson',
      path: '/whatson',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/event/pages/search.vue'
    })
  })
}
