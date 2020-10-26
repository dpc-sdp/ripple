import { getTermsFilter } from './services/template-utils'
module.exports = {
  cards: {
    requestMapping: params => {
      let filters = params.filters ? getTermsFilter(params) : []
      const sort = []

      if ((!params.filters || !params.filters.hasOwnProperty('field_node_site')) && params.site) {
        filters.push({
          term: {
            field_node_site: params.site
          }
        })
      }

      if (params.type && params.type !== 'all') {
        filters.push({
          terms: {
            type: params.type
          }
        })
      }

      if (params.sort && Array.isArray(params.sort)) {
        sort.push(...params.sort)
      }

      if (params.promote) {
        sort.push({ sticky: 'desc' })
      }

      const query = {
        query: {
          bool: {
            filter: {
              bool: {
                must: filters
              }
            }
          }
        },
        sort
      }

      return query
    },
    responseMapping (res) {
      return res
    }
  }
}
