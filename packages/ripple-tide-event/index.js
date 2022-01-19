import { getField, getImageFromField /*, getLandingPageComponents */ } from '@dpc-sdp/ripple-tide-api/src/services/utils'
// import componentMapping from './component-mapping'
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
    image: (src) => getImageFromField(src, 'field_featured_image'), // Not working properly
    // dateStart: ,
    // dateEnd: ,
    location: (src) => src.field_event_details?.field_paragraph_location
    // location: (src) => getField(src, 'field_event_details')
    //   .map(eventDetails => getField(eventDetails, 'field_paragraph_location'))
    // bodyComponents: async function (src) { return await getLandingPageComponents(src, 'field_landing_page_component', componentMapping, this) },
  },
  includes: [
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_event_category',
    'field_event_details.field_event_requirements',
    'field_featured_image',
    'field_audience'
  ]
}
