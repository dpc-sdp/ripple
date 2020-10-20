import get from 'lodash.get'
import { getTermsFilter, getPagination, getField } from '@dpc-sdp/ripple-tide-search-api/services/template-utils'
import { getFilterTodayConditions } from './lib/card-collection-utils'
import { truncateText, capitalize } from '@dpc-sdp/ripple-global/utils/helpers.js'
import calcStatus from '@dpc-sdp/ripple-grants/grants-status.js'

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

      if (params.date_filter && params.date_filter.criteria !== 'all') {
        filters.push(...getFilterTodayConditions(params))
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
        sort,
        ...getPagination(params)
      }

      return query
    },
    responseMapping: res => {
      const hits = get(res, ['hits', 'hits'], [])
      if (hits && hits.length > 0) {
        return {
          total: res.hits.total,
          results: hits.map(hit => {
            const item = hit._source
            const result = {
              uuid: getField(item, ['uuid']),
              title: getField(item, ['title']),
              tag: capitalize(getField(item, ['type']).replace('_', ' ')),
              summary: truncateText(getField(item, ['field_landing_page_summary', 'field_page_intro_text', 'summary_processed', 'body']), 200),
              image: getField(item, ['field_media_image_absolute_path']),
              link: {
                url: getField(item, ['field_node_link', 'url']),
                text: ''
              }
            }

            if (item.type && item.type.length > 0) {
              switch (item.type[0]) {
                case 'event':
                  return {
                    ...result,
                    date: {
                      from: getField(item, ['field_event_date_start_value']),
                      to: getField(item, ['field_event_date_end_value'])
                    }
                  }
                case 'grant':
                  return {
                    ...result,
                    status: calcStatus(getField(item, ['field_node_dates_start_value', 'field_node_dates_end_value'], false))
                  }
                case 'publication':
                  return {
                    ...result,
                    date: {
                      from: getField(item, ['field_publication_date'])
                    }
                  }
                case 'landing_page':
                  return {
                    ...result,
                    tag: undefined,
                    topic: getField(item, ['field_topic_name'])
                  }
                // TODO: Add all profile types here
                case 'profile':
                case 'aboriginal_honour_roll':
                case 'sr_profile':
                case 'vada_profile':
                case 'vdrp_profile':
                  return {
                    ...result,
                    tag: 'Profile',
                    variation: 'profile',
                    summary: getField(item, ['field_profile_intro_text', 'field_landing_page_summary']),
                    date: getField(item, ['field_year'])
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
