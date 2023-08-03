import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import { ApplicationError } from '@dpc-sdp/ripple-tide-api/errors'

const getSearchListingConfig = (src) =>
  src.hasOwnProperty('field_search_configuration') &&
  JSON.parse(src.field_search_configuration)

const parseJSONField = (rawValue) => {
  return JSON.parse(rawValue)
}

const getProcessedSearchListingConfig = async (src, tidePageApi) => {
  let rawConfig = null

  // rawConfig = getMaybeRawConfig(src)

  if (!rawConfig) {
    rawConfig = buildConfigFromDrupalFields(src)
  }

  return await processConfig(rawConfig, tidePageApi)
}

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

const parseGlobalFiltersFromDrupal = (rawFilters) => {
  return rawFilters.map((rawFilter) => {
    switch (rawFilter.type) {
      case 'paragraph--listing_content_type':
        // TODO once fixed in backend
        return {
          terms: {
            type: rawFilter.field_listing_global_contenttype.map(
              (contentType) => contentType.meta.drupal_internal__target_id
            )
          }
        }
      case 'paragraph--listing_site':
        return {
          terms: {
            field_node_site: rawFilter.field_listing_site_site.map(
              (site) => site.meta.drupal_internal__target_id
            )
          }
        }
      case 'paragraph--listing_custom_filter':
        return parseJSONField(rawFilter.field_listing_custom_filter_conf)
      default:
        return null
    }
  })
}

const parseUserFiltersFromDrupal = (rawFilters) => {
  const test = rawFilters.map((rawFilter) => {
    console.log(rawFilter)
    switch (rawFilter.type) {
      case 'paragraph--listing_select_from_taxonomy': {
        // TODO update this to expect a string instead of array when BE is corrected
        if (!rawFilter.field_listing_selected_taxonomy?.length) {
          return null
        }

        // TODO once fixed in backend
        const taxonomyName =
          rawFilter.field_listing_selected_taxonomy[0].meta
            .drupal_internal__target_id
        return {
          id: taxonomyName,
          component: 'TideSearchFilterDropdown',
          aggregations: {
            field: taxonomyName,
            source: 'taxonomy'
          },
          filter: {
            type: 'terms',
            // TODO get override from BE
            value: `field_${taxonomyName}_name`
          },
          props: {
            id: taxonomyName,
            label: rawFilter.field_user_filter_input_label,
            placeholder: rawFilter.field_user_filter_placeholder,
            type: 'RplFormDropdown',
            multiple: true
          }
        }
      }
      case 'paragraph--listing_user_custom_filter':
        console.log(parseJSONField(rawFilter.field_user_filter_configuration))
        return parseJSONField(rawFilter.field_user_filter_configuration)
      default:
        return null
    }
  })

  return test
}

const parseResultsConfigFromDrupal = (src) => {
  if (src.field_listing_results_config) {
    return parseJSONField(src.field_listing_results_config)
  }

  return {
    layout: {
      component:
        src.field_listing_layout_component.meta.drupal_internal__target_id
    },
    item: {
      '*': {
        component:
          src.field_listing_results_component.meta.drupal_internal__target_id
      }
    }
  }
}

const buildConfigFromDrupalFields = (src) => {
  return {
    searchListingConfig: {
      // TODO parse number better
      resultsPerPage: parseInt(src.field_listing_results_per_page) || 10,
      labels: {
        submit: src.field_search_submit_label,
        placeholder: src.field_search_input_placeholder
      }
      // TODO should custom sort be in the UI?
      // customSort: ???
    },
    queryConfig: parseJSONField(src.field_listing_query_config),
    globalFilters: parseGlobalFiltersFromDrupal(
      src.field_listing_global_filters
    ),
    userFilters: parseUserFiltersFromDrupal(src.field_listing_user_filters),
    //TODO MAP RESULTS
    results: parseResultsConfigFromDrupal(src)
  }
}

const getMaybeRawConfig = (src) => {
  let parsedConfig = null

  if (src.field_search_configuration) {
    try {
      parsedConfig = JSON.parse(src.field_search_configuration)
    } catch (e) {
      throw new ApplicationError(
        "Couldn't parse raw search listing config JSON field ('field_search_configuration')"
      )
    }
  }

  return parsedConfig
}

const processConfig = async (config, tidePageApi) => {
  const filters = await Promise.all(
    config.userFilters.map(async (uiFilter) => {
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
          const test = {
            ...uiFilter,
            props: {
              ...uiFilter.props,
              options: getUniqueListBy(activeTaxonomies, 'label')
            }
          }
          return test
        }
      }

      return uiFilter
    })
  )

  return {
    ...config,
    userFilters: filters
  }
}

const tideCollectionModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    summary: 'field_landing_page_summary',
    introText: 'field_landing_page_intro_text',
    config: getProcessedSearchListingConfig
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    'field_listing_global_filters',
    'field_listing_user_filters'
  ]
}

export default tideCollectionModule
