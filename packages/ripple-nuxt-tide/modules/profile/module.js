module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidehonorroll',
      path: this.options.tide.profile ? this.options.tide.profile.route : '/profiles',
      component: '@dpc-sdp/ripple-nuxt-tide/modules/profile/pages/search.vue'
    })
  })
}
