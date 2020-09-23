import chunk from 'lodash.chunk'

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

    if (settings.sort && settings.sort.field) {
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

    if (settings.form && settings.form.fields) {
      queryParams.aggs = []
      settings.form.fields.forEach(f => {
        if (f.type === 'select') {
          queryParams.aggs.push(f.field)
        }
      })
    }

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

export const getIncludesByType = (type) => {
  const includes = [
    'title',
    'type',
    'changed',
    'field_topic_name',
    'url',
    'uuid',
    'field_media_image_absolute_path',
    'field_node_primary_csite',
    'field_landing_page_summary'
  ]
  switch (type) {
    case 'event':
      return [
        ...includes,
        'field_event_date_start_value',
        'field_event_details_event_address_1',
        'field_event_details_event_price_from',
        'field_event_date_end_value',
        'field_event_category_name'
      ]
    case 'profile':
    case 'vdrp_profile':
    case 'sr_profile':
    case 'vada_profile':
    case 'aboriginal_honor_roll':
      return [
        ...includes,
        'field_profile_category_name',
        'field_year'
      ]

    default:
      return includes
  }
}

export const getFilterFormFromConfig = async ({ fields, submit = false, clear = false, columns = 2 }, aggregations) => {
  const schema = {
    fields: []
  }
  const model = {}
  const colClasses = {
    1: `one`,
    2: `two`
  }
  if (fields && Array.isArray(fields)) {
    fields.forEach(fieldConfig => {
      model[fieldConfig.field] = ''
      const field = {
        label: fieldConfig.label,
        model: fieldConfig.field,
        placeholder: fieldConfig.placeholder,
        styleClasses: `form-group--col-${colClasses[columns]}`
      }
      switch (fieldConfig.type) {
        case 'select':
          field.type = 'rplselect'
          if (aggregations.hasOwnProperty(fieldConfig.field) && Array.isArray(aggregations[fieldConfig.field])) {
            field.values = aggregations[fieldConfig.field].map(val => ({
              id: val,
              name: val
            }))
          }
          field.multiselect = fieldConfig.multiple || true
          break
        case 'number':
          field.type = 'input'
          field.inputType = 'number'
          break
        case 'text':
          field.type = 'input'
          field.inputType = 'text'
          break

        default:
          break
      }
      schema.fields.push(field)
    })
  }
  if (submit && submit.button) {
    schema.fields.push({
      type: 'rplsubmitloader',
      buttonText: submit.buttonText || 'Submit',
      loading: false,
      autoUpdate: true,
      styleClasses: ['form-group--inline']
    })
  }
  if (clear) {
    schema.fields.push({
      type: 'rplclearform',
      buttonText: clear.buttonText || 'Clear search filters',
      styleClasses: ['form-group--inline']
    })
  }
  if (schema.fields.length > columns) {
    const groups = chunk(schema.fields, columns)
    schema.groups = []
    groups.forEach(group => schema.groups.push({
      legend: '',
      fields: group
    }))
    delete schema.fields
  }

  return {
    formData: {
      schema,
      model,
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true
      },
      formState: {},
      tag: 'rpl-fieldset'
    }
  }
}

export default {
  capitalize,
  getQueryParams,
  getSiteDomainUrl,
  getFilterTodayConditions,
  getFilterFormFromConfig
}
