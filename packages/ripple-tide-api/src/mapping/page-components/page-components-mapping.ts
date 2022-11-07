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

export const landingPageComponentsMapping = {
  'paragraph--basic_text': basicTextMapping,
  'paragraph--accordion': accordionMapping,
  'paragraph--promotion_card': promoCardMapping,
  'paragraph--navigation_card': navigationCardMapping,
  'paragraph--card_keydates': keyDatesMapping,
  'paragraph--statistics_grid': statisticsGridMapping
}

export const landingPageComponentsIncludes = [
  ...basicTextIncludes,
  ...accordionIncludes,
  ...promoCardIncludes,
  ...navigationCardIncludes,
  ...keyDatesIncludes,
  ...statisticsGridIncludes
]

export {
  basicTextIncludes,
  accordionIncludes,
  promoCardIncludes,
  navigationCardIncludes,
  keyDatesIncludes,
  statisticsGridIncludes
}
