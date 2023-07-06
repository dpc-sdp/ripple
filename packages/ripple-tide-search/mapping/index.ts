import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const getSearchListingConfig = (src) =>
  src.hasOwnProperty('field_search_configuration') &&
  JSON.parse(src.field_search_configuration)

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

const tideCollectionModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    summary: 'field_landing_page_summary',
    searchListingConfig: (src) =>
      getSearchListingConfig(src).searchListingConfig,
    index: (src) =>
      getSearchListingConfig(src).index ||
      process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME,
    queryConfig: (src) => getSearchListingConfig(src).queryConfig,
    globalFilters: (src) => getSearchListingConfig(src).globalFilters,
    results: (src) => getSearchListingConfig(src).results,
    userFilters: async (src, tidePageApi) => {
      const config = getSearchListingConfig(src)
      if (config.userFilters) {
        for (let i = 0; i < config.userFilters.length; i++) {
          const uiFilter = config.userFilters[i]
          if (uiFilter.aggregations?.source === 'taxonomy') {
            const taxonomyResults = await tidePageApi.getTaxonomy(
              uiFilter.aggregations?.field
            )
            // Taxonomies can be disabled, only return active ones
            const activeTaxonomies = taxonomyResults
              .filter((tax) => tax.status === true)
              .map((item) => ({
                id: item.drupal_internal__tid,
                label: item.name,
                value: item.name
              }))

            if (activeTaxonomies && activeTaxonomies.length > 0) {
              uiFilter.props.options = getUniqueListBy(
                activeTaxonomies,
                'label'
              )
            }
          }
        }
        return config.userFilters
      }
    }
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    })
  ]
}

export default tideCollectionModule
