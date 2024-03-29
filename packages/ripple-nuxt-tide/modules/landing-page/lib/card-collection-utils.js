/**
 * Get query params from card collection settings
 *
 * @param {Object} settings Settings from card collection
 * @returns {Object} queryParams to pass to pass to tideSearchApi
 */
export const getQueryParams = (data) => {
  const config = data.hasOwnProperty('config') ? data.config : data
  if (config) {
    const queryParams = {
      type: config.content_type || 'all'
    }

    if (config.filters) {
      delete config.filters.type
      queryParams.filters = config.filters
    }

    if (config.sort && config.sort.field !== '') {
      queryParams.sort = [{ [`${config.sort.field}`]: config.sort.direction }]
    }

    if (config.sort && config.sort.field) {
      queryParams.sort = [{ [`${config.sort.field}`]: config.sort.direction }]
    }

    if (config.filter_today && config.filter_today.status) {
      queryParams.date_filter = {
        start_field: config.filter_today.start_date,
        end_field: config.filter_today.end_date,
        criteria: config.filter_today.criteria
      }
    }

    const carouselLimit = 9

    if (config.field_listing_display_type === 'grid' && config.perPage) {
      queryParams.limit = config.perPage
    } else if (data.perPage && data.perPage !== 0 && data.perPage < carouselLimit) {
      queryParams.limit = data.perPage
    } else {
      queryParams.limit = carouselLimit
    }

    if (config.page) {
      queryParams.page = config.page
    }

    return queryParams
  }
}

export const getSiteDomainUrl = (url, currentSite, domains) => {
  if (url) {
    if (url.includes('/site-')) {
      const siteId = parseInt(url.substring(
        url.indexOf('-') + 1,
        url.indexOf('/', 2)
      ), 10)
      const path = url.substring(url.indexOf('/', 2))
      if (siteId === currentSite) {
        return path
      } else if (domains.hasOwnProperty(currentSite)) {
        return '//' + domains[siteId] + path
      }
    }
  }
  return url
}

export const getFilterTodayConditions = (params, today = new Date()) => {
  const filters = []
  if (params && params.date_filter.start_field) {
    const startField = params.date_filter.start_field
    const endField = params.date_filter.end_field || startField
    switch (params.date_filter.criteria) {
      case 'all':
        // Nothing
        break
      case 'upcoming':
        filters.push({ range: { [startField]: { gte: today } } })
        break
      case 'from_current':
        filters.push({ range: { [endField]: { gte: today } } })
        break
      case 'past':
        filters.push({ range: { [endField]: { lte: today } } })
        break
      default:
        console.log('Criteria not supported')
        break
    }
  } else {
    console.log('Start date not set. Ignoring date filter.')
  }
  return filters
}

export const getIncludesByType = (types) => {
  const includes = [
    'title',
    'type',
    'changed',
    'field_topic_name',
    'url',
    'uuid',
    'field_media_image_absolute_path',
    'field_node_primary_csite',
    'field_landing_page_summary',
    'field_node_link'
  ]

  if (!types || !Array.isArray(types)) {
    return includes
  }

  types.forEach(type => {
    switch (type) {
      case 'event':
        includes.push(
          'field_event_date_start_value',
          'field_event_details_event_address_1',
          'field_event_details_event_price_from',
          'field_event_date_end_value',
          'field_event_category_name'
        )
        break
      case 'news':
        includes.push(
          'field_event_intro_text'
        )
        break
      case 'grant':
        includes.push(
          'field_node_dates_start_value',
          'field_node_dates_end_value'
        )
        break
      case 'publication':
        includes.push(
          'field_publication_date'
        )
        break
      case 'profile':
      case 'vdrp_profile':
      case 'sr_profile':
      case 'vada_profile':
      case 'aboriginal_honor_roll':
        includes.push(
          'field_profile_category_name',
          'field_year'
        )
        break
    }
  })
  return [...new Set(includes)]
}

export default {
  getQueryParams,
  getSiteDomainUrl,
  getFilterTodayConditions
}
