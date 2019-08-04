module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'tidewhatson',
      path: '/whatson',
      component: '~/tide/modules/event/pages/search.vue'
    })
  })
}
