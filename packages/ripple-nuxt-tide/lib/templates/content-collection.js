import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'
const fs = require('fs')

export default ({ app, req, store , route }, inject) => {
  // We need to serialize functions, so use `serialize` instead of `JSON.stringify`.
  // https://github.com/nuxt-community/modules/issues/170
  // https://www.npmjs.com/package/serialize-javascript
  const options = <%= serialize(options) %>

  let contentCollectionClass = ContentCollection

  if (options.useCustomPath) {
    contentCollectionClass = require('../tide/tide.content-collection.js').default
  }

  inject('tideContentCollection', contentCollectionClass)
}
