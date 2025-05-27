import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import { getBodyFromField } from '@dpc-sdp/ripple-tide-api'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  secondaryCampaignIncludes,
  secondaryCampaignMapping
} from '@dpc-sdp/ripple-tide-landing-page/mapping'
import { getProcessedSearchListingConfig } from './utils'

const tideCollectionModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    summary: 'field_landing_page_summary',
    beforeResults: (src: string) =>
      getBodyFromField(src, 'field_above_results_content'),
    afterResults: (src: string) =>
      getBodyFromField(src, 'field_below_results_content'),
    introText: 'field_landing_page_intro_text',
    config: getProcessedSearchListingConfig,
    secondaryCampaign: secondaryCampaignMapping
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    ...secondaryCampaignIncludes,
    'field_listing_global_filters',
    'field_listing_user_filters',
    'field_listing_user_filters.field_field',
    'field_layout_component',
    'field_results_component',
    'field_graphical_image.field_media_image'
  ]
}

export default tideCollectionModule
