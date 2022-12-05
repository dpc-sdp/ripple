import { getField } from '@dpc-sdp/ripple-tide-api'

export const query = {
  include: [
    'field_topic',
    'field_featured_image',
    'field_featured_image.field_media_image'
  ],
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

export const mapping = (field) => ({
  type: 'promo',
  title: getField(field, 'title', ''),
  url: getField(field, 'path.url', ''),
  image: getField(field, 'field_featured_image.thumbnail.url', null),
  meta: {
    topic: getField(field, 'field_topic.name', null),
    date: getField(field, 'field_news_date', null)
  },
  summary: getField(field, 'field_landing_page_summary', '')
})
