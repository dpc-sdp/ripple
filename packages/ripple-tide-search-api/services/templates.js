import { getTermsFilter, getIncludesByType } from './template-utils'
export default {
  all: params => {
    const filter = []
    if (params.type) {
      filter.push({
        terms: {
          type: params.type.split(',')
        }
      })
    }
    let must = {
      match_all: {}
    }
    if (params.title) {
      must = {
        multi_match: {
          query: params.title,
          fields: [ 'title' ]
        }
      }
    }
    const excludes = ['node_grants', 'field_audience_uuid', 'field_event_category_uuid', 'langcode', 'uuid', 'status', 'field_event_details_event_requirements_uuid', 'field_event_category_tid']
    return {
      query: {
        bool: {
          must,
          filter
        }
      },
      _source: {
        excludes
      }
    }
  },
  collection: params => {
    let filter = []
    let must = {
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

    return {
      query: {
        bool: {
          must,
          filter: {
            bool: {
              must: filter
            }
          }
        }
      },
      _source: {
        includes: getIncludesByType(params.type)
      }
    }
  }
}
