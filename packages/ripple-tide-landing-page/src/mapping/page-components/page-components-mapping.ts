import {
  accordionIncludes,
  accordionMapping
} from './accordion/accordion-mapping.js'
import {
  basicTextIncludes,
  basicTextMapping
} from './basic-text/basic-text-mapping.js'
import {
  promoCardIncludes,
  promoCardMapping
} from './promo-card/promo-card-mapping.js'
import {
  navigationCardIncludes,
  navigationCardMapping
} from './navigation-card/navigation-card-mapping.js'
import {
  keyDatesIncludes,
  keyDatesMapping
} from './key-dates/key-dates-mapping.js'
import {
  statisticsGridIncludes,
  statisticsGridMapping
} from './statistics-grid/statistics-grid-mapping.js'
import {
  introBannerIncludes,
  introBannerMapping
} from './intro-banner/intro-banner-mapping.js'
import {
  searchBannerIncludes,
  searchBannerMapping
} from './search-banner/search-banner-mapping.js'
import {
  timelineMapping,
  timelineIncludes
} from './timeline/timeline-mapping.js'
import {
  callToActionMapping,
  callToActionIncludes
} from './call-to-action/call-to-action-mapping.js'
import {
  mediaGalleryMapping,
  mediaGalleryIncludes
} from './media-gallery/media-gallery-mapping.js'
import { webformIncludes, webformMapping } from './webforms/webforms-mapping.js'

export const landingPageComponentsMapping = {
  'paragraph--basic_text': basicTextMapping,
  'paragraph--accordion': accordionMapping,
  'paragraph--promotion_card': promoCardMapping,
  'paragraph--navigation_card': navigationCardMapping,
  'paragraph--card_keydates': keyDatesMapping,
  'paragraph--statistics_grid': statisticsGridMapping,
  'paragraph--introduction_banner': introBannerMapping,
  'paragraph--embedded_search_form': searchBannerMapping,
  'paragraph--timelines': timelineMapping,
  'paragraph--call_to_action': callToActionMapping,
  'paragraph--media_gallery': mediaGalleryMapping,
  'paragraph--embedded_webform': webformMapping
}

export const landingPageComponentsIncludes = [
  ...basicTextIncludes,
  ...accordionIncludes,
  ...promoCardIncludes,
  ...navigationCardIncludes,
  ...keyDatesIncludes,
  ...statisticsGridIncludes,
  ...introBannerIncludes,
  ...searchBannerIncludes,
  ...timelineIncludes,
  ...callToActionIncludes,
  ...mediaGalleryIncludes,
  ...webformIncludes
]

export {
  basicTextIncludes,
  accordionIncludes,
  promoCardIncludes,
  navigationCardIncludes,
  keyDatesIncludes,
  statisticsGridIncludes
}
