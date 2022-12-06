import { getField } from '@dpc-sdp/ripple-tide-api'
import { baseIncludes, baseMapping } from './base-mapping.js'

export const query = {
  include: [...baseIncludes, 'field_event_details'],
  page: {
    offset: 0,
    limit: 6
  },
  sort: {
    'sort-end': {
      path: 'field_event_details.0.field_paragraph_date_range.end_value'
    },
    'sort-start': {
      path: 'field_event_details.0.field_paragraph_date_range.value'
    }
  }
}

export const mapping = (field) => {
  const baseFields = baseMapping(field)

  return {
    type: 'promo',
    ...baseFields,
    meta: {
      ...baseFields.meta,
      dateStart: getField(
        field,
        'field_event_details.[0].field_paragraph_date_range.value',
        null
      ),
      dateEnd: getField(
        field,
        'field_event_details.[0].field_paragraph_date_range.end_value',
        null
      )
    }
  }
}
