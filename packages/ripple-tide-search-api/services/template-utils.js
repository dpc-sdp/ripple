export const getTermsFilter = (params) => {
  if (params.filters) {
    return Object.keys(params.filters).map(key => {
      const values = params.filters[key] && params.filters[key] && params.filters[key].values
      if (values && !Array.isArray(values)) {
        return {
          term: {
            [`${key}`]: `${values}`
          }
        }
      } else if (Array.isArray(values)) {
        return {
          terms: {
            [`${key}`]: values
          }
        }
      }
    }).filter(f => f)
  }
}

export const getPagination = (params) => {
  const query = {}
  if (params.limit) {
    query.size = params.limit
  }
  if (params.page && params.page !== 0) {
    query.from = query.size * params.page
  }
  return query
}

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
