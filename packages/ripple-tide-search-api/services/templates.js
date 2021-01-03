import { getTermsFilter, getPagination } from './template-utils'

/*
Templates to transform elasticsearch requests and responses.
The items here are the "built in" templates. Please keep this minimal.
*/

export default {
  site: {
    requestMapping: params => {
      let filter = []
      let queryClause = {
        match_all: {}
      }
      if (!params) {
        return {
          query: queryClause
        }
      }
      const queryFields = [
        'body',
        'field_landing_page_summary',
        'field_paragraph_body',
        'field_paragraph_summary',
        'title'
      ]
      if (params.q) {
        queryClause = {
          must: {
            multi_match: {
              query: params.q,
              fields: queryFields
            }
          },
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
            ...queryClause
          }
        },
        ...getPagination(params)
      }

      if (filter.length > 0) {
        query.query.filter = {
          bool: {
            must: filter
          }
        }
      }

      return query
    }
  }
}
