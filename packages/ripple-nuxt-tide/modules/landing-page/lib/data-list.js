/**
 * Get query params for data listings
 *
 * @param {Object} data Settings from data listing
 * @returns {Object} queryParams to pass to tideSearchApi
 */
export const getQueryParams = (data = {}) => {
  const {
    perPage = 10,
    currentPage = 1,
    sort = null,
    sortOptions = [],
    model = {},
    searchField = null,
    queryFields = [],
    aggregationFields = []
  } = data

  let params = {
    page: currentPage,
    limit: perPage
  }

  if (searchField && model?.[searchField]) {
    params.q = model[searchField]
  }

  if (sort) {
    const sortValue = sortOptions.find(({ id }) => sort === id)
    params.sort = { [sortValue?.key || sort]: sortValue?.order ?? 'asc' }
  }

  if (queryFields) {
    params.fields = queryFields
  }

  if (aggregationFields) {
    params.aggs = aggregationFields
  }

  const filters = Object.keys(model)
    .filter(key => key !== searchField)
    .reduce((obj, key) => {
      const values = getModelValue(key, model)
      return values ? { ...obj, [key]: { values } } : obj
    }, {})

  if (Object.keys(filters).length !== 0) {
    params.filters = filters
  }

  return params
}

/**
 * Get a models value
 *
 * @param {String} key The field get the value of
 * @param {Object} model The search fields
 * @returns The model value
 */
const getModelValue = (key, model) => {
  const value = model[key]
  const validArray = Array.isArray(value) && value.length > 0
  const validString = typeof value === 'string' && value.length > 0
  const validObject = (typeof value === 'object' && value !== null) && Object.keys(value).length > 0

  return (validArray || validString || validObject) ? value : null
}
