import { getQueryParams } from './lib/card-collection-utils'
import get from 'lodash.get'

/**
 * Set the site domain map for generating search result link url
 */
async function initializeSitesDomainMap (context) {
  if (!context.store.state.tideSite.sitesDomainMap) {
    const domains = await context.app.$tide.getSitesDomainMap()
    context.store.commit('tideSite/setSitesDomainMap', domains)
  }
}

/**
 * Get the require site parameters to resolve domain links.
 */
function getDomainLinkVariables (context, pageData) {
  const tideSite = context.store.state.tideSite
  const siteId = tideSite.siteId.toString()
  const domains = tideSite.sitesDomainMap
  const primarySiteId = pageData.tidePage?.field_node_primary_site?.drupal_internal__tid?.toString()
  return { siteId, primarySiteId, domains }
}

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
    // Inject a test component -------------------------------------------------
    pageData.tidePage.appDComponents.push({
      name: 'content-collection',
      data: {
        schema: {
          title: 'Middleware Content Collection',
          description: 'My description'
        }
      }
    })
    // -------------------------------------------------------------------------
    if (pageData.tidePage) {
      const contentCollections = pageData.tidePage.appDComponents.filter(comp => comp.name === 'content-collection')
      if (contentCollections.length > 0) {
        await initializeSitesDomainMap(context)
        const environment = getDomainLinkVariables(context, pageData)
        contentCollections.forEach(collection => {
          collection.data.environment = environment
        })
      }
    }
  }
}
