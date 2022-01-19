import { getField, getImageFromField } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import components from './component-loader'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-event/index.vue'),
  components,
  mapping: {
    title: 'title',
    summary: 'field_landing_page_summary',
    link: (src) => ({
      text: 'See event details',
      url: getField(src, 'path.url', null)
    }),
    image: (src) => getImageFromField(src, 'field_featured_image'),
    dateStart: (src) => src.field_event_details[0]?.field_paragraph_date_range?.value,
    dateEnd: (src) => src.field_event_details[0]?.field_paragraph_date_range?.end_value,
    location: (src) => src.field_event_details?.field_paragraph_location
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
