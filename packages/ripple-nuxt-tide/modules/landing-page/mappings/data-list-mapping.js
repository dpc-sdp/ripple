import {
  getTermsFilter,
  getPagination,
  getAggregations
} from '@dpc-sdp/ripple-tide-search-api/services/template-utils'

export const requestMapping = params => {
  let sort = []
  let search = {}
  let filter = []
  let aggs = {}

  if (params?.sort) {
    const sortBy = Array.isArray(params.sort) ? params.sort : [params.sort]

    sort.push(...sortBy)
  }

  if (params?.q) {
    search = {
      should: {
        match_phrase: {
          title: {
            query: params.q,
            boost: 2
          }
        }
      }
    }
  }

  if (params?.q && params?.fields) {
    search.must = {
      multi_match: {
        query: params.q,
        fields: params.fields
      }
    }

    if (params?.fuzziness) {
      search.must.multi_match.fuzziness = params.fuzziness
    }
  }

  if (params?.filters) {
    filter.push({
      bool: {
        must: getTermsFilter(params)
      }
    })
  }

  if (params?.aggs) {
    aggs = getAggregations(params)
  }

  return {
    query: {
      bool: {
        filter,
        ...search
      }
    },
    sort,
    aggs,
    ...getPagination(params)
  }
}

export const responseMapping = data => data

module.exports = {
  requestMapping,
  responseMapping
}
