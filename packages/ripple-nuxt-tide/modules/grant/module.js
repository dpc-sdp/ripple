module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    const grantConfig = this.options.tide.modules.grant

    if (!grantConfig?.disableGrantListing) {
      routes.push({
        name: 'tidegrants',
        path: '/grants',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/grant/pages/search.vue'
      })
    }
  })
}
