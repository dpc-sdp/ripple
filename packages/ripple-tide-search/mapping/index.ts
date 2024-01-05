import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import { getBodyFromField } from '@dpc-sdp/ripple-tide-api'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import { ApplicationError } from '@dpc-sdp/ripple-tide-api/errors'
import { processConfig, parseJSONField } from './../mapping/utils'
import {
  secondaryCampaignIncludes,
  secondaryCampaignMapping
} from '@dpc-sdp/ripple-tide-landing-page/mapping'

const getProcessedSearchListingConfig = async (src, tidePageApi) => {
  let rawConfig = null
  rawConfig = getMaybeRawConfig(src)

  if (!rawConfig) {
    rawConfig = buildConfigFromDrupalFields(src)
  }

  return await processConfig(rawConfig, tidePageApi)
}

const parseGlobalFiltersFromDrupal = (rawFilters) => {
  return rawFilters.map((rawFilter) => {
    switch (rawFilter.type) {
      case 'paragraph--listing_content_type':
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
    switch (rawFilter.type) {
      case 'paragraph--searchable_fields': {
        const taxonomyName = rawFilter.field_field.field_taxonomy_machine_name

        return {
          id: taxonomyName,
          component: 'TideSearchFilterDropdown',
          aggregations: {
            field: taxonomyName,
            source: 'taxonomy'
          },
          filter: {
            type: 'terms',
            value: rawFilter.field_field.field_elasticsearch_field
          },
          props: {
            id: taxonomyName,
            label: rawFilter.field_input_label,
            placeholder: rawFilter.field_placeholder,
            type: 'RplFormDropdown',
            multiple: true
          }
        }
      }
      case 'paragraph--listing_user_custom_filter':
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
      component: src.field_layout_component.name
    },
    item: {
      '*': {
        component: src.field_results_component.name
      }
    }
  }
}

const buildConfigFromDrupalFields = (src) => {
  return {
    searchListingConfig: {
      resultsPerPage: src.field_listing_results_per_page || 10,
      labels: {
        submit: src.field_search_submit_label,
        placeholder: src.field_search_input_placeholder
      },
      customSort: src.field_custom_sort_configuration
        ? parseJSONField(src.field_custom_sort_configuration)
        : undefined
    },
    queryConfig: parseJSONField(src.field_listing_query_config),
    globalFilters: parseGlobalFiltersFromDrupal(
      src.field_listing_global_filters
    ),
    userFilters: parseUserFiltersFromDrupal(src.field_listing_user_filters),
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

const tideCollectionModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    summary: 'field_landing_page_summary',
    afterResults: (src: string) =>
      getBodyFromField(src, 'field_below_results_content'),
    introText: 'field_landing_page_intro_text',
    config: getProcessedSearchListingConfig,
    secondaryCampaign: secondaryCampaignMapping
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    ...secondaryCampaignIncludes,
    'field_listing_global_filters',
    'field_listing_user_filters',
    'field_listing_user_filters.field_field',
    'field_layout_component',
    'field_results_component'
  ]
}

export default tideCollectionModule
