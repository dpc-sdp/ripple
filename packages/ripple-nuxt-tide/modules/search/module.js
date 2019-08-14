module.exports = function () {
  this.options.router.parseQuery = function (q) {
    return require('qs').parse(q)
  }

  this.options.router.stringifyQuery = function (q) {
    return require('qs').stringify(q, {
      strictNullHandling: true,
      skipNulls: true,
      indices: false,
      ignoreQueryPrefix: true,
      addQueryPrefix: true, // add the '?'
      format: 'RFC1738' // '{a: "b c"}' => a=b+c'
    })
  }

  this.extendRoutes((routes, resolve) => {
    routes.push(
      {
        name: 'tidesearch',
        path: '/search',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/search/pages/TideSearch.vue'
      },
      {
        name: 'tagsearch',
        path: '/tags/:tag',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/search/pages/TopicTagSearch.vue'
      },
      {
        name: 'topicsearch',
        path: '/topic/:topic',
        component: '@dpc-sdp/ripple-nuxt-tide/modules/search/pages/TopicTagSearch.vue'
      }
    )
  })
}
