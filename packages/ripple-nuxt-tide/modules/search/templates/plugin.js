import { search } from '@dpc-sdp/ripple-nuxt-tide/modules/search/index.js'
import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default ({ app }, inject) => {
  const options = <%= JSON.stringify(options) %>

  // Site is not a search options, we only need it to initialize the search.
  const site = options.site
  delete options.site
  inject('tideSearchOptions', options)
  inject('tideSearch', search(options, app.router, site))
  if (process.server) {
    logger.warn('Tide Search is loaded as on "default" mode(You may want to switch to "on demand" mode to reduce the site initial js load size).', { label: 'Tide Search' })
  }
}
