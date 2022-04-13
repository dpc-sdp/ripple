module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    const eventConfig = this.options.tide.modules.event

    if (!eventConfig?.disableEventListing) {
      routes.push({
        name: 'tidewhatson',
        path: '/whatson',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/event/pages/search.vue'
      })
    }
  })
}
