import { ApplicationError } from '@dpc-sdp/ripple-tide-api/errors'
import { defu as defuMerge } from 'defu'

export const getSearchListingConfig = (src) =>
  src.hasOwnProperty('field_search_configuration') &&
  JSON.parse(src.field_search_configuration)

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export const parseJSONField = (rawValue) => {
  return JSON.parse(rawValue)
}

export const processConfig = async (config, tidePageApi) => {
  const filters = await Promise.all(
    (config.userFilters || []).map(async (uiFilter) => {
      if (uiFilter.aggregations?.source === 'taxonomy') {
        const taxonomyResults = await tidePageApi.getTaxonomy(
          uiFilter.aggregations?.field
        )
        // Taxonomies can be disabled, only return active ones
        // sort taxonomy values by weight value to control order in dropdown
        const activeTaxonomies = taxonomyResults
          .filter((tax) => tax.status === true)
          .sort((a, b) => a.weight - b.weight)
          .map((item) => ({
            id: item.drupal_internal__tid.toString(),
            label: item.name,
            value: item.name,
            parent:
              item?.parent?.[0]?.meta?.drupal_internal__target_id?.toString() ||
              null
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

export const getProcessedSearchListingConfig = async (src, tidePageApi) => {
  const rawConfig = getMaybeRawConfig(src)
  const drupalFields = buildConfigFromDrupalFields(
    src,
    !!src.field_search_configuration
  )

  const config = defuMerge(rawConfig, drupalFields)

  return await processConfig(config, tidePageApi)
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
  if (src?.field_listing_results_config) {
    return parseJSONField(src.field_listing_results_config)
  }

  if (src?.field_layout_component && src?.field_results_component) {
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

  return null
}

const shouldAutoFilterByCurrentSite = (src, hasRawConfig: boolean) => {
  const hasSiteFilter = src.field_listing_global_filters?.some((rawFilter) => {
    return rawFilter.type === 'paragraph--listing_site'
  })

  // If the custom JSON blob field has a value, we can no longer assume that an
  // empty site filter means that we want to filter by the current site.
  // Instead we need to respect whatever value is in the custom JSON blob.
  return !hasRawConfig ? !hasSiteFilter : undefined
}

const buildConfigFromDrupalFields = (src, hasRawConfig: boolean) => {
  return {
    searchListingConfig: {
      filterByCurrentSite: shouldAutoFilterByCurrentSite(src, hasRawConfig),
      hideSearchForm: src?.field_listing_hide_search_form ?? false,
      resultsPerPage: src?.field_listing_results_per_page || 10,
      labels: {
        submit: src?.field_search_submit_label,
        placeholder: src?.field_search_input_placeholder
      },
      customSort: src?.field_custom_sort_configuration
        ? parseJSONField(src.field_custom_sort_configuration)
        : undefined
    },
    queryConfig: src?.field_listing_query_config
      ? parseJSONField(src.field_listing_query_config)
      : undefined,
    globalFilters: src?.field_listing_global_filters?.length
      ? parseGlobalFiltersFromDrupal(src.field_listing_global_filters)
      : undefined,
    userFilters: src?.field_listing_user_filters?.length
      ? parseUserFiltersFromDrupal(src.field_listing_user_filters)
      : undefined,
    results: parseResultsConfigFromDrupal(src)
  }
}

const getMaybeRawConfig = (src) => {
  let parsedConfig = {}

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
