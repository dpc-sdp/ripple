import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'
import { getField } from '../../../utils/mapping-utils.js'
import { genericCardMapping } from '../generic-card-mapping.js'

export const navigationCardMapping = (field): TideDynamicPageComponent<any> => {
  return {
    component: 'TideLandingPageNavCard',
    id: field.drupal_internal__id,
    props: {
      displayStyle: getField(field, 'field_nav_card_display_style', ''),
      ...genericCardMapping(field)
    }
  }
}

export const navigationCardIncludes = []
