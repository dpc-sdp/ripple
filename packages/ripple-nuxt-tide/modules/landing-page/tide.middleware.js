// import AutomatedListingSearch from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/automated-listing-search'
import searchClient from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/search'

export default {
  automatedListing: async (context, pageData) => {
    if (pageData.tidePage) {
      // Automated card listing.
      const automatedCardRequests = []
      // Find automated card listings and make Elasticsearch requests.
      for (const key in pageData.tidePage.appDComponents) {
        const component = pageData.tidePage.appDComponents[key]
        if (component.name === 'automated-card-listing') {
          const primarySiteId = pageData.tidePage.field_node_primary_site.drupal_internal__tid.toString()
          const currentPageId = pageData.tidePage.drupal_internal__nid.toString()
          const state = {
            page: 1,
            siteId: context.store.state.tide.siteData.drupal_internal__tid,
            primarySiteId: primarySiteId || '',
            ignoreId: currentPageId || null,
            domains: context.store.state.tideSite.sitesDomainMap,
            cta: component.data.cardCtaText || ''
          }
          // Request listings for all automated card listings.
          automatedCardRequests.push({
            key,
            state,
            promise: searchClient.search({ content_type: 'event', ...component.data.listingSettings })
          })
        }
      }
      // Set initial card / state data on all resolved automated card listings promises.
      if (automatedCardRequests.length > 0) {
        const automatedCardResults = await Promise.all(automatedCardRequests.map(item => item.promise))
        automatedCardResults.forEach((result, index) => {
          const request = automatedCardRequests[index]
          const component = pageData.tidePage.appDComponents[request.key]
          component.data.initialResults = result
          component.data.initialState = request.state
        })
      }
    }
  }
}
