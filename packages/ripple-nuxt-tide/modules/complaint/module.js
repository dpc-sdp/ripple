module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidecomplaints',
      path: '/complaints',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/complaint/pages/search.vue'
    })
  })
}
