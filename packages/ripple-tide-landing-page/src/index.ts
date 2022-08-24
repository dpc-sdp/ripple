import {
  tidePageMappingBase,
  getLandingPageComponents
} from '@dpc-sdp/ripple-tide-api'
import componentMapping from './component.mapping.js'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideLandingPageModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-landing-page/component',
  schema: '@dpc-sdp/ripple-tide-landing-page/types',
  mapping: {
    ...tidePageMappingBase,
    summary: 'field_landing_page_summary',
    headerComponents: async (page) => {
      return await getLandingPageComponents(
        page,
        'field_landing_page_header',
        componentMapping
      )
    },
    bodyComponents: async (page) => {
      return await getLandingPageComponents(
        page,
        'field_landing_page_component',
        componentMapping
      )
    }
  },
  includes: [
    'field_whats_next',
    'field_graphical_image.field_media_image',
    'field_bottom_graphical_image.field_media_image',
    'field_landing_page_hero_logo.field_media_image',
    'field_landing_page_hero_image.field_media_image',
    'field_landing_page_hero_banner',
    'field_landing_page_c_primary.field_block_image.field_media_image',
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
    'field_landing_page_component.field_complex_image_media.field_media_image',
    'field_landing_page_component.field_statistic_block',
    'field_landing_page_component.field_paragraph_webform'
  ]
}

export default tideLandingPageModule
