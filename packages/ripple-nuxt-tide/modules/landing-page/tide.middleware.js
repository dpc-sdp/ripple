import { getQueryParams } from './lib/card-collection-utils'

import get from 'lodash.get'
export default {
  cardCollection: async (context, pageData) => {
    if (pageData.tidePage) {
      // Automated card listing.
      const automatedCardRequests = []
      // Find automated card listings and make Elasticsearch requests.
      for (const key in pageData.tidePage.appDComponents) {
        const component = pageData.tidePage.appDComponents[key]
        if (component.name === 'automated-card-listing') {
          const sitesDomainMap = get(context, ['store', 'state', 'tideSite', 'sitesDomainMap'])
          if (!sitesDomainMap) {
            const domains = await context.app.$tide.getSitesDomainMap()
            context.store.commit('tideSite/setSitesDomainMap', domains)
          }

          // Request listings for all automated card listings.
          automatedCardRequests.push({
            key,
            promise: context.app.$tideSearchApi.search('/cards', {
              site: context.store.state.tideSite.siteId,
              ...getQueryParams(component.data.config)
            })
          })
        }
      }

      // Set initial card data on all resolved automated card listings promises.
      if (automatedCardRequests.length > 0) {
        const automatedCardResults = await Promise.all(automatedCardRequests.map(item => item.promise))
        automatedCardResults.forEach((response, index) => {
          const request = automatedCardRequests[index]
          const component = pageData.tidePage.appDComponents[request.key]
          component.data.initialResults = response.results
          component.data.total = response.total
          component.data.sidebar = pageData.tideLayout.sidebar
        })
      }
    }
  },
  contentCollection: async (context, pageData) => {
    // Inject a component for testing.
    pageData.tidePage.appDComponents.push({
      name: 'content-collection',
      data: {
        schema: {
          title: 'Middleware Content Collection',
          description: 'My description'
        }
      }
    })
    if (pageData.tidePage) {
      // Content Collections
      const contentCollectionRequests = []
      // Find content collections and make Elasticsearch requests.
      for (const key in pageData.tidePage.appDComponents) {
        const component = pageData.tidePage.appDComponents[key]
        if (component.name === 'content-collection') {
          const sitesDomainMap = get(context, ['store', 'state', 'tideSite', 'sitesDomainMap'])
          if (!sitesDomainMap) {
            const domains = await context.app.$tide.getSitesDomainMap()
            context.store.commit('tideSite/setSitesDomainMap', domains)
          }

          // Request listings for all content collections.
          contentCollectionRequests.push({
            key,
            promise: context.app.$tideSearchApi.search('/cards', { site: context.store.state.tideSite.siteId, ...getQueryParams(component.data.config) })
          })
        }
      }

      // Set initial data for all resolved content collection promises.
      if (contentCollectionRequests.length > 0) {
        const results = await Promise.all(contentCollectionRequests.map(item => item.promise))
        results.forEach((response, index) => {
          const request = contentCollectionRequests[index]
          const component = pageData.tidePage.appDComponents[request.key]
          component.data.initialResults = response.results
          component.data.total = response.total
          component.data.sidebar = pageData.tideLayout.sidebar
        })
      }
    }
  }
}
