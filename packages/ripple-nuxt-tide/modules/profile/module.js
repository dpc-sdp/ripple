module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    const profileConfig = this.options.tide.modules.profile

    if (!profileConfig?.disableProfileListing) {
      routes.push({
        name: 'tidehonorroll',
        path: profileConfig.route || '/profiles',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/profile/pages/search.vue'
      })
    }
  })
}
