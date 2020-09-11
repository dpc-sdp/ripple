/**
 * Get query params from card collection settings
 *
 * @param {Object} settings Settings from card collection
 * @returns {Object} queryParams to pass to pass to tideSearchApi
 */
export const getQueryParams = (settings) => {
  if (settings) {
    const queryParams = {
      type: settings.content_type || 'all'
    }

    if (settings.filters) {
      delete settings.filters.type
      queryParams.filters = settings.filters
    }

    if (settings.sort && settings.sort.field !== '') {
      queryParams.sort = [{ [`${settings.sort.field}`]: settings.sort.direction }]
    }

    if (settings.sort) {
      queryParams.sort = [{ [`${settings.sort.field}`]: settings.sort.direction }]
    }

    if (settings.filter_today && settings.filter_today.status) {
      queryParams.date_filter = {
        start_field: settings.filter_today.start_date,
        end_field: settings.filter_today.end_date,
        criteria: settings.filter_today.criteria
      }
    }

    const carouselLimit = 9

    if (settings.display) {
      if (settings.display.type === 'grid' && settings.display.items) {
        queryParams.limit = settings.display.items
      } else if (settings.display.items && settings.display.items !== 0 && settings.display.items < carouselLimit) {
        queryParams.limit = settings.display.items
      } else {
        queryParams.limit = carouselLimit
      }
    }
    if (settings.page) {
      queryParams.page = settings.page
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

export const getFilterTodayConditions = (params) => {
  const filters = []
  if (params.date_filter.start_field) {
    const startField = params.date_filter.start_field
    const endField = params.date_filter.end_field || startField
    const today = new Date()
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

export const capitalize = (str) => `${str.charAt(0).toUpperCase() + str.slice(1)}`

export default {
  capitalize,
  getQueryParams,
  getSiteDomainUrl,
  getFilterTodayConditions
}
