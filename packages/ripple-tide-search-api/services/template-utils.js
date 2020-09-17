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
