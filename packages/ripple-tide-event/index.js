import {
  getField,
  getImageFromField,
  getAddress
} from '@dpc-sdp/ripple-tide-api/src/services/utils'
import { formatDate } from './utils'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-event/index.vue'),
  mapping: {
    title: 'title',
    summary: 'field_landing_page_summary',
    link: (src) => ({
      text: 'See event details',
      url: getField(src, 'path.url', null)
    }),
    image: (src) => getImageFromField(src, 'field_featured_image'),
    date: (src) => {
      const format = (src.field_event_details[0]?.field_show_time) ? 'DD MMMM YYYY hh:mm a' : 'DD MMMM YYYY'
      const start = formatDate(src.field_event_details[0]?.field_paragraph_date_range?.value, format)
      const end = formatDate(src.field_event_details[0]?.field_paragraph_date_range?.end_value, format)
      const range = start + (end ? ` - ${end}` : '')

      return {
        start,
        end,
        range
      }
    },
    address: (src) => getAddress(src.field_event_details[0]?.field_paragraph_location),
    prices: (src) => {
      const from = src.field_event_details[0]?.field_paragraph_event_price_from
      const to = src.field_event_details[0]?.field_paragraph_event_price_to

      return from && from + (to ? ` - ${to}` : '')
    },
    bookLink: (src) => src.field_event_details[0]?.field_paragraph_link,
    requirements: (src) => src.field_event_details[0]?.field_event_requirements
  },
  includes: [
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_event_category',
    'field_event_details.field_event_requirements',
    'field_featured_image',
    'field_featured_image.field_media_image',
    'field_audience'
  ]
}
