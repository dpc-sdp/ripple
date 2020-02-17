const path = require('path')

module.exports = function () {
  const options = this.options.tide

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'tide-site.js',
    options: options
  })

  // This won't override nuxt tide module's proxy option, as they have been added into array already.
  // But this may impact nuxt proxy settings if there is, so need to be reviewed for that case.
  this.options.proxy = {
    ...this.options.proxy,
    '/sitemap.xml': options.baseUrl + 'sitemap.xml?site=' + options.site,
    '/sitemaps/**/sitemap.xml': { target: options.baseUrl, pathRewrite: (path) => { return options.baseUrl + path + '?site=' + options.site } },
    '/sitemaps': options.baseUrl + 'sitemaps?site=' + options.site
  }
}
