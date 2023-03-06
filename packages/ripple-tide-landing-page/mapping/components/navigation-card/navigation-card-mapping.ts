import { getField } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { genericCardMapping, ITideCardBase } from '../generic-card-mapping.js'

export interface ITideNavCard extends ITideCardBase {
  displayStyle: 'noImage' | 'thumbnail' | 'featured'
}

export const navigationCardMapping = (
  field
): TideDynamicPageComponent<ITideNavCard> => {
  return {
    component: 'TideLandingPageNavCard',
    id: `${field.drupal_internal__id}`,
    props: {
      displayStyle: getField(field, 'field_nav_card_display_style', ''),
      ...genericCardMapping(field)
    }
  }
}

export const navigationCardIncludes = []

export default {
  includes: navigationCardIncludes,
  mapping: navigationCardMapping,
  contentTypes: ['landing_page']
}
