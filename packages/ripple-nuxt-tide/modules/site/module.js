const path = require('path')

module.exports = function () {
  const options = this.options.tide
  const { URL } = require('url')
  const baseUrl = options.baseUrl ? new URL(options.baseUrl) : ''
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'tide-site.js',
    options: options
  })

  const getQuery = (req) => {
    return req.query ? '&' + new URLSearchParams(req.query).toString() : ''
  }

  // This won't override nuxt tide module's proxy option, as they have been added into array already.
  // But this may impact nuxt proxy settings if there is, so need to be reviewed for that case.
  this.options.proxy = {
    ...this.options.proxy,
    '/sitemap.xml': {
      target: baseUrl,
      pathRewrite: (path, req) => {
        return baseUrl + 'sitemap.xml?site=' + options.site + getQuery(req)
      }
    },
    '/sitemaps/**/sitemap.xml': {
      target: baseUrl,
      pathRewrite: (path, req) => {
        return baseUrl + path + '?site=' + options.site + getQuery(req)
      }
    }
  }
}
