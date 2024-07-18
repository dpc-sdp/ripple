import basicTextMapping from './components/basic-text/basic-text-mapping'
import fromLibraryMapping from './components/from-library/from-library-mapping'
import accordionMapping from './components/accordion/accordion-mapping'
import promoCardMapping from './components/promo-card/promo-card-mapping'
import navigationCardMapping from './components/navigation-card/navigation-card-mapping'
import keyDatesMapping from './components/key-dates/key-dates-mapping'
import statisticsGridMapping from './components/statistics-grid/statistics-grid-mapping'
import introBannerMapping from './components/intro-banner/intro-banner-mapping'
import searchBannerMapping from './components/search-banner/search-banner-mapping'
import timelineMapping from './components/timeline/timeline-mapping'
import callToActionMapping from './components/call-to-action/call-to-action'
import mediaGalleryMapping from './components/media-gallery/media-gallery-mapping'
import cardCarouselMapping from './components/card-carousel/card-carousel-mapping'
import contentCollectionMapping from './components/content-collection/content-collection-mapping'
import webformMapping from './components/webforms/webforms-mapping'
import complexImageMapping from './components/complex-image/complex-image-mapping'
import dataTableMapping from './components/data-table/data-table-mapping'
import compactCardsMapping from './components/compact-cards/compact-cards-mapping'
import openFormsMapping from './components/openforms/openforms-mapping'

const mappings = {
  'paragraph--basic_text': basicTextMapping,
  'paragraph--from_library': fromLibraryMapping,
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
  'paragraph--card_carousel': cardCarouselMapping,
  'paragraph--content_collection_enhanced': contentCollectionMapping,
  'paragraph--embedded_webform': webformMapping,
  'paragraph--complex_image': complexImageMapping,
  'paragraph--data_table': dataTableMapping,
  'paragraph--compact_card_collection': compactCardsMapping,
  'paragraph--form_embed_openforms': openFormsMapping
}

// Handle reusable paragraphs in any includes so they load the referenced items.
Object.keys(mappings).forEach(k => {
  if (k !== 'paragraph--from_library' && mappings[k].includes.length > 0) {
    mappings[k].includes = mappings[k].includes.concat(mappings[k].includes.map(k => k.replace('field_landing_page_component.','field_landing_page_component.field_reusable_paragraph.paragraphs.')))
  }
})

export default mappings
