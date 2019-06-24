const path = require('path')

module.exports = async function () {
  const options = {
    layer: 'dataLayer',
    pageTracking: true,
    respectDoNotTrack: false,
    dev: true,
    env: {}, // env is supported for backward compability and is alias of query
    query: {},
    timeout: 1000,
    ...this.options.tide.gtm
  }

  // Don't include when run in dev mode unless dev: true is configured
  if (this.options.dev && !options.dev) {
    return
  }

  // Don't include when no GTM id is given
  if (!options.id) {
    return
  }

  if (typeof (options.id) === 'function') {
    options.id = await options.id()
  }

  // Build the <script> URL
  const queryParams = Object.assign({}, options.env, options.query)

  queryParams.id = options.id

  if (options.layer) {
    queryParams.l = options.layer
  }

  const queryString = Object.keys(queryParams)
    .filter(key => queryParams[key] !== null && queryParams[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&')

  // Add google tag manager script to head
  this.options.head.script.push({
    src: (options.scriptURL || 'https://www.googletagmanager.com/gtm.js') + '?' + queryString,
    async: true
  })

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'google-tag-manager.js',
    ssr: false,
    options
  })
}
