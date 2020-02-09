const path = require('path')

module.exports = function () {
  const options = this.options.tide.search
  // Turn on "Load on demand" for reducing initial JS load size.
  // Tide search will be loaded only in search page.
  // If this flag is not set, we keep previous way to inject tide search as a global service.
  options.loadOnDemand = options.loadOnDemand === '1' || options.loadOnDemand === true
  if (options.loadOnDemand) {
    this.addPlugin({
      src: path.resolve(__dirname, 'templates/plugin-on-demand.js'),
      fileName: 'tide-search-on-demand.js',
      options: options
    })
  } else {
    this.addPlugin({
      src: path.resolve(__dirname, 'templates/plugin.js'),
      fileName: 'tide-search.js',
      options: { ...options, site: this.options.tide.site }
    })
  }

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
