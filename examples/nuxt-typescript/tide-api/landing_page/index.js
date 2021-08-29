import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
import componentMapping from './component-mapping'

export default {
  component: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-landing-page/index.vue'),
  mapping: {
    title: 'title',
    summary: 'field_landing_page_summary',
    bodyComponents: async function (src) {
      const components = await utils.getLandingPageComponents(
        src,
        'field_landing_page_component',
        componentMapping,
        this
      )
      if (components && Array.isArray(components)) {
        return components.filter(cmp => cmp)
      }
      return []
    }
  },
  includes: [
    'field_featured_image',
    'field_landing_page_component',
    'field_landing_page_component.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_topic',
    'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_accordion',
    'field_landing_page_component.field_paragraph_keydates',
    'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
    'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_complex_image_media.field_media_image'
  ]
}
