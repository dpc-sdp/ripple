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
    // TODO - Remove this when the back-end support for a Content Collection
    // component has been added.
    pageData.tidePage.appDComponents.push({
      name: 'content-collection',
      data: {
        schema: {
          title: 'Middleware Content Collection',
          description: 'My description',
          callToAction: { text: 'View all', url: '/search' },
          internal: {
            contentTypes: ['landing_page'],
            itemsToLoad: 20,
            sort: [
              { field: 'created', direction: 'desc' }
            ]
          },
          interface: {
            keyword: {
              type: 'basic',
              label: 'Search by keyword',
              placeholder: 'Enter keyword(s)'
            },
            filters: {
              submit: {
                visibility: 'visible',
                label: 'Apply change'
              },
              clearForm: {
                visibility: 'visible',
                label: 'Clear search'
              },
              fields: [
                {
                  type: 'basic',
                  options: {
                    model: 'field_tags_name',
                    type: 'rplselect',
                    multiselect: true,
                    label: 'Tags',
                    placeholder: 'Select some tags',
                    values: []
                  },
                  additionalClasses: [ 'app-content-collection__form-col-3' ],
                  'elasticsearch-field': 'field_tags_name',
                  'elasticsearch-aggregation': true
                },
                {
                  type: 'basic',
                  options: {
                    model: 'field_topic_name',
                    type: 'rplselect',
                    multiselect: true,
                    label: 'Topic',
                    placeholder: 'Select a topic',
                    values: []
                  },
                  additionalClasses: [ 'app-content-collection__form-col-3' ],
                  'elasticsearch-field': 'field_topic',
                  'elasticsearch-aggregation': true
                }
              ]
            },
            display: {
              type: 'grid',
              options: {
                resultsCountText: 'Displaying {range} of {count} results',
                loadingText: 'Loading',
                noResultsText: 'Sorry! We couldn\'t find any matches',
                errorText: 'Search isn\'t working right now, please try again later.',
                sort: {
                  type: 'field',
                  values: [
                    { "name": "Relevance", "value": null },
                    { "name": "Title A-Z", "value": [ { "field": "title.keyword", "direction": "asc" } ] },
                    { "name": "Title Z-A", "value": [ { "field": "title.keyword", "direction": "desc" } ] },
                    { "name": "Newest", "value": [ { "field": "created", "direction": "desc" } ] },
                    { "name": "Oldest", "value": [ { "field": "created", "direction": "asc" } ] }
                  ]
                },
                itemsToLoad: {
                  type: 'field',
                  values: [
                    { "name": "3", "value": 3 },
                    { "name": "6", "value": 6 },
                    { "name": "12", "value": 12 }
                  ]
                },
                pagination: {
                  type: 'numbers'
                }
              },
              resultComponent: {
                type: 'basic-card'
              }
            }
          }
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
