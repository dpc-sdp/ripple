import {
  getDynamicPageComponents,
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'
import {
  landingPageComponentsMapping,
  landingPageComponentsIncludes
} from './page-components/page-components-mapping.js'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  heroHeaderMapping,
  heroHeaderIncludes
} from './hero-header/hero-header-mapping.js'
import {
  primaryCampaignIncludes,
  primaryCampaignMapping
} from './primary-campaign/primary-campaign-mapping.js'
import {
  secondaryCampaignIncludes,
  secondaryCampaignMapping
} from './secondary-campaign/secondary-campaign-mapping.js'

const tideLandingPageModule: RplTideMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withTopicTags: true,
      withSidebarSiteSectionNav: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarWhatsNext: true,
      withSidebarSocialShare: true
    }),
    summary: 'field_landing_page_summary',
    showHeroAcknowledgement: 'field_show_ack_of_country',
    showInPageNav: 'field_show_table_of_content',
    showHeroImageCaption: 'field_show_hero_image_caption',
    showTopicTags: 'field_show_topic_term_and_tags',
    inPageNavHeadingLevel: (src) => {
      if (src.field_node_display_headings === 'showH2AndH3') {
        return 'h3'
      }

      return 'h2'
    },
    background: (src) => {
      if (src.field_landing_page_bg_colour === 'grey') {
        return 'alt'
      }

      return 'default'
    },
    heroHeader: heroHeaderMapping,
    primaryCampaign: primaryCampaignMapping,
    secondaryCampaign: secondaryCampaignMapping,
    headerComponents: async (src, tidePageApi) => {
      return await getDynamicPageComponents(
        src,
        'field_landing_page_header',
        landingPageComponentsMapping,
        tidePageApi
      )
    },
    bodyComponents: async (src, tidePageApi) => {
      return await getDynamicPageComponents(
        src,
        'field_landing_page_component',
        landingPageComponentsMapping,
        tidePageApi
      )
    }
  },
  includes: [
    ...tidePageBaseIncludes({
      withTopicTags: true,
      withSidebarSiteSectionNav: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarWhatsNext: true,
      withSidebarSocialShare: true
    }),
    ...landingPageComponentsIncludes,
    ...heroHeaderIncludes,
    ...primaryCampaignIncludes,
    ...secondaryCampaignIncludes,
    'field_landing_page_header',
    'field_landing_page_component.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_topic',
    'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
    'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_complex_image_media.field_media_image'
  ]
}

export default tideLandingPageModule

export {
  landingPageComponentsMapping,
  landingPageComponentsIncludes,
  basicTextIncludes,
  accordionIncludes,
  promoCardIncludes,
  navigationCardIncludes,
  keyDatesIncludes,
  statisticsGridIncludes
} from './page-components/page-components-mapping.js'
