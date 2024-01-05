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
    config.userFilters.map(async (uiFilter) => {
      if (uiFilter.aggregations?.source === 'taxonomy') {
        const taxonomyResults = await tidePageApi.getTaxonomy(
          uiFilter.aggregations?.field
        )
        // Taxonomies can be disabled, only return active ones
        // sort taxonomy values by weight value to control order in dropdown
        const activeTaxonomies = taxonomyResults
          .filter((tax) => tax.status === true)
          .map((item) => ({
            id: item.drupal_internal__tid,
            label: item.name,
            value: item.name
          }))
          .sort((a, b) => a.weight - b.weight)

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
