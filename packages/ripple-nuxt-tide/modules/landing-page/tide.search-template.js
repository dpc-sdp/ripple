import { getTermsFilter, getPagination, getField } from '@dpc-sdp/ripple-tide-search-api/services/template-utils'
import { getFilterTodayConditions } from './lib/card-collection-utils'
import calcStatus from '@dpc-sdp/ripple-grants/grants-status.js'
import { truncateText, capitalize } from '@dpc-sdp/ripple-global/utils/helpers.js'

export const defaultMapping = {
  uuid: ['uuid'],
  title: ['title'],
  summary: (item) => truncateText(getField(item, ['field_landing_page_summary', 'field_page_intro_text', 'field_event_intro_text', 'field_profile_intro_text', 'summary_processed', 'body']), 200),
  image: ['field_media_image_absolute_path'],
  link: (item) => ({
    url: getField(item, ['field_node_link', 'url']),
    text: ''
  })
}

const tag = (item) => capitalize(getField(item, ['type']).replace('_', ' '))
const topic = ['field_topic_name']

export const profileMapping = {
  variation: () => 'profile',
  tag: () => 'Profile',
  date: ['field_year']
}

export const requestMapping = params => {
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
}

export const responseMapping = {
  event: {
    ...defaultMapping,
    date: () => ({
      from: (item) => getField(item, ['field_event_date_start_value']),
      to: (item) => getField(item, ['field_event_date_end_value'])
    })
  },
  grant: {
    ...defaultMapping,
    tag,
    status: (item) => calcStatus(getField(item, ['field_node_dates_start_value', 'field_node_dates_end_value'], false))
  },
  news: {
    ...defaultMapping,
    tag
    // TODO: Date needs indexing so we can display here
  },
  publication: {
    ...defaultMapping,
    tag
  },
  'landing_page': {
    ...defaultMapping,
    topic
  },
  'page': {
    ...defaultMapping,
    topic
  },
  'profile': {
    ...defaultMapping,
    ...profileMapping
  },
  default: defaultMapping
}

module.exports = {
  cards: {
    requestMapping,
    responseMapping
  }
}
