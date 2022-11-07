import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'
import { getField } from '../../../utils/mapping-utils.js'
import { genericCardMapping } from '../generic-card-mapping.js'

export const promoCardMapping = (field): TideDynamicPageComponent<any> => {
  return {
    component: 'TideLandingPagePromoCard',
    id: field.drupal_internal__id,
    props: {
      displayStyle: getField(field, 'field_promo_card_display_style', ''),
      ...genericCardMapping(field)
    }
  }
}

export const promoCardIncludes = []
