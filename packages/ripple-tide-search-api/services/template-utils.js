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

export const getIncludesByType = (type) => {
  const includes = [
    'title',
    'type',
    'changed',
    'field_topic_name',
    'url',
    'field_node_primary_csite'
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

    default:
      return includes
  }
}
