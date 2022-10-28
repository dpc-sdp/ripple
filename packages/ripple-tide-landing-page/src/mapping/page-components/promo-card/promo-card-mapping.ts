import { getField } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { genericCardMapping, ITideCardBase } from '../generic-card-mapping.js'

export interface ITidePromoCard extends ITideCardBase {
  displayStyle: 'noImage' | 'thumbnail' | 'profile'
}

export const promoCardMapping = (
  field
): TideDynamicPageComponent<ITidePromoCard> => {
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
