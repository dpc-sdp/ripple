import { getLinkFromField, getLandingPageComponents, getImageFromField } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import bodyComponentMapping from './mapping/body'
import headerComponentMapping from './mapping/header'
// import sidebarComponentMapping from './mapping/sidebar'
import components from './component-loader'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-landing-page/index.vue'),
  components,
  mapping: {
    title: 'title',
    summary: 'field_landing_page_summary',
    backgroundColor: 'field_landing_page_bg_colour',
    acknowledgement: 'field_show_ack_of_country',
    heroBanner: {
      links: (src) => src.field_landing_page_key_journeys?.field_paragraph_links?.map(l => getLinkFromField(l)),
      title: 'title',
      image: (src) => getImageFromField(src, 'field_landing_page_hero_image'),
      visible: () => true
    },
    headerComponents: async function (src) {
      const components = []
      const headerComponents = await getLandingPageComponents(src, 'field_landing_page_header', headerComponentMapping, this)
      if (headerComponents.length > 0) {
        components.push(...headerComponents)
      }
      // campaign primary
      if (src.field_landing_page_c_primary) {
        const campaignPrimary = headerComponentMapping['block_content--campaign']?.call(this, src.field_landing_page_c_primary)
        components.push(campaignPrimary)
      }
      return components
    },
    bodyComponents: async function (src) { return await getLandingPageComponents(src, 'field_landing_page_component', bodyComponentMapping, this) },
    showLastUpdated: () => true
  },
  includes: [
    'field_featured_image',
    'field_landing_page_component',
    'field_whats_next',
    'field_graphical_image.field_media_image',
    'field_bottom_graphical_image.field_media_image',
    'field_landing_page_hero_logo.field_media_image',
    'field_landing_page_hero_image.field_media_image',
    'field_landing_page_hero_banner',
    'field_landing_page_c_primary.field_block_image.field_media_image',
    'field_landing_page_c_primary',
    'field_landing_page_c_secondary.field_block_image.field_media_image',
    'field_landing_page_c_secondary.field_block_embedded_video',
    'field_landing_page_key_journeys',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_landing_page_header',
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
