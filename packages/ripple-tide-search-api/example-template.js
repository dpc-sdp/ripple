import get from 'lodash.get'
import { getTermsFilter, getPagination } from './services/template-utils'

export default {
  cards: {
    requestMapping: params => {
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
        ...getPagination(params)
      }

      return query
    },
    responseMapping (res) {
      const hits = get(res, ['hits', 'hits'], [])
      if (hits && hits.length > 0) {
        return {
          total: res.hits.total,
          results: hits.map(hit => {
            const item = hit._source
            const result = {
              title: get(item, ['title', 0], ''),
              summary: get(item, ['field_landing_page_summary', 0], ''),
              image: get(item, ['field_media_image_absolute_path', 0], ''),
              link: {
                url: get(item, ['field_node_link', 0], get(item, ['url', 0], '')),
                text: ''
              }
            }
            if (item.type && item.type.length > 0) {
              switch (item.type[0]) {
                case 'event':
                  return {
                    ...result,
                    date: {
                      from: get(item, ['field_event_date_start_value', 0], ''),
                      to: get(item, ['field_event_date_end_value', 0], '')
                    }
                  }
                case 'publication':
                  return {
                    ...result,
                    date: {
                      from: get(item, ['field_event_date_start_value', 0], ''),
                      to: get(item, ['field_event_date_end_value', 0], '')
                    }
                  }
                case 'landing_page':
                  return {
                    ...result,
                    topic: get(item, ['field_topic_name', 0], '')
                  }
                case 'profile':
                case 'aboriginal_honour_roll':
                  return {
                    ...result,
                    summary: get(item, ['field_profile_intro_text', 0], ''),
                    date: get(item, ['field_year', 0], '')
                  }
                default:
                  return result
              }
            }
          })
        }
      } else if (res.hits) {
        return {
          total: res.hits.total,
          results: res.hits.hits
        }
      } else {
        return res
      }
    }
  }
}
