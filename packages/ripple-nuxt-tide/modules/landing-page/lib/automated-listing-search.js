import ElasticSearch from './elasticsearch'
import { getDSL, getProcessedESResults, getTotalSteps } from './automated-listing-utils'
import logger from '@dpc-sdp/ripple-nuxt-tide/lib/core/logger'

export default {
  /**
   * A function that takes an Elasticsearch DSL and returns results.
   * Can be used for test mocking.
   */
  endpoint: ElasticSearch.search.bind(ElasticSearch),
  /**
   * Get cards from Elasticsearch for an automated listing.
   * @param {Object} settings { index, server_index, results, display, card_display, filter_operator, filter_today, filters, sort }
   * @param {Object} state { page, siteId, primarySiteId, domains, cta }
   */
  async getListing (settings, state) {
    if (settings && state) {
      const esDSL = getDSL(settings, state)
      try {
        const response = await this.endpoint(esDSL)
        const filteredHits = getProcessedESResults(settings, state, response)
        return {
          totalSteps: getTotalSteps(settings, response.hits.total),
          hits: filteredHits
        }
      } catch (error) {
        logger.error('Failed to get the automated listing.', { error, label: 'Middleware' })
      }
    }
    return { totalSteps: 0, hits: [] }
  }
}
