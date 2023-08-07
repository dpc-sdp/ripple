/**
 * @description Helper to get value from elastic search response
 * @param result Elasticsearch result
 * @param property Name of property to get
 * @param multiple Defaults to fetching the first value (all terms results are an array), set to true to fetch the whole array
 */
export const getSearchResultValue = (
  result: Record<string, any>,
  property: string,
  multiple = false
) => {
  const value = result[property]
  if (!value) return null
  return multiple ? value : value[0]
}

/**
 * @description Helper to get a single string value from a query string in the case that there are multiple of the same key
 */
export const getSingleQueryStringValue = (
  query: string | string[],
  property: string
): string | undefined => {
  const value = query[property]

  if (Array.isArray(value)) {
    return value.length ? value[0] : undefined
  }

  return value || undefined
}

export const truncateText = (text, stop = 150, clamp) => {
  if (text && typeof text === 'string') {
    if (text.length > stop) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
    return text
  }
  return ''
}

/**
 * @description Helper to get active filter data as URL params
 */
export const getActiveFilterURL = (filters) => {
  const activeFilters = filters
    ? Object.entries(filters).filter((o) =>
        Array.isArray(o[1]) ? o[1].length : o[1]
      )
    : {}

  return new URLSearchParams(activeFilters).toString()
}
