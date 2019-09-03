module.exports = function () {
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: '500 error test page',
      path: '/500',
      component: '~/tide/modules/example-error-page/pages/500.vue'
    })
  })
}
