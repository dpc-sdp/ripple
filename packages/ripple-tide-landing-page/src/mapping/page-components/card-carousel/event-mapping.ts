import { getField } from '@dpc-sdp/ripple-tide-api'

export const query = {
  include: [
    'field_event_details',
    'field_featured_image',
    'field_featured_image.field_media_image'
  ],
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

export const mapping = (field) => ({
  type: 'promo',
  title: getField(field, 'title'),
  url: getField(field, 'path.url'),
  image: getField(field, 'field_featured_image.thumbnail.url'),
  meta: {
    tag: getField(field, 'field_topic.name'),
    dateRange: {
      start: getField(
        field,
        'field_event_details.[0].field_paragraph_date_range.value'
      ),
      end: getField(
        field,
        'field_event_details.[0].field_paragraph_date_range.end_value'
      )
    }
  },
  summary: getField(field, 'field_landing_page_summary')
})
