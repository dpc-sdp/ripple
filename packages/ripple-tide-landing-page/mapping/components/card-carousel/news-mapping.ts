import { getField } from '@dpc-sdp/ripple-tide-api'
import { baseIncludes, baseMapping } from './base-mapping.js'

export const query = {
  include: [...baseIncludes, 'field_topic'],
  page: {
    offset: 0,
    limit: 9
  },
  sort: {
    'sort-start': {
      path: 'field_news_date',
      direction: 'DESC'
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
      date: getField(field, 'field_news_date', null)
    }
  }
}
