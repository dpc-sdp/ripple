import { getTermsFilter, getPagination, getIncludesByType } from './template-utils'

/*
Templates to transform elasticsearch requests and responses.
The items here are the "built in" templates. Please keep this minimal.
*/

export default {
  collection: params => {
    let filter = []
    let queryClause = {
      match_all: {}
    }

    if (params.filters) {
      filter = getTermsFilter(params)
    }

    if (params.type && params.type !== 'all') {
      filter.push({
        term: {
          type: params.type
        }
      })
    }

    const query = {
      query: {
        bool: {
          must: queryClause,
          filter: {
            bool: {
              must: filter
            }
          }
        }
      },
      ...getPagination(),
      _source: getIncludesByType(params.type)
    }

    return query
  }
}
