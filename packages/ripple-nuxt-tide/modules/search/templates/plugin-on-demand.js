import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default ({ app }, inject) => {
  const options = <%= JSON.stringify(options) %>
  inject('tideSearchOptions', options)
  if (process.server) {
    logger.info('Tide Search is loaded as on demand mode.', { label: 'Tide Search' })
  }
}
