import get from 'lodash.get'

export const getTermsFilter = (params) => {
  if (params.filters) {
    return Object.keys(params.filters).map(key => {
      const values = params.filters[key] && params.filters[key] && params.filters[key].values
      if (values && !Array.isArray(values)) {
        return {
          term: {
            [`${key}`]: `${values}`
          }
        }
      } else if (Array.isArray(values)) {
        return {
          terms: {
            [`${key}`]: values
          }
        }
      }
    }).filter(f => f)
  }
}
export const getField = (source, fields = [], defaultVal = '') => {
  for (let i = 0; i < fields.length; i++) {
    const field = get(source, fields[i])
    if (field && field.length > 0 && field[0].length > 0) {
      return field[0]
    }
  }
  return defaultVal
}

export const getPagination = (params) => {
  const query = {}
  if (params.limit) {
    query.size = parseInt(params.limit, 10)
  }
  if (params.page) {
    const page = parseInt(params.page, 10)
    if (page > 1) {
      query.from = ((page - 1) * query.size)
    }
  }
  return query
}
