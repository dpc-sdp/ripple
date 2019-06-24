module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidehonorroll',
      path: '/profiles',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/profile/pages/search.vue'
    })
  })
}
