module.exports = function () {
  // This will add a custom route.
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'example-search',
      path: '/example-search',
      component: '~/tide/modules/example-search/components/Search.vue'
    })
  })
}
