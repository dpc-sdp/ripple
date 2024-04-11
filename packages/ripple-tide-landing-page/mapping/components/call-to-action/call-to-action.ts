import {
  getBody,
  getImageFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'
import type {
  TideDynamicPageComponent,
  TideImageField
} from '@dpc-sdp/ripple-tide-api/types'

export interface ITideCallToAction {
  title: string
  image: TideImageField
  url: string
  ctaText: string
  summary: string
}

export const callToActionMapping = (
  field
): TideDynamicPageComponent<ITideCallToAction> => {
  const image = getImageFromField(
    field,
    'field_paragraph_media.field_media_image'
  )

  const link = getLinkFromField(field, 'field_paragraph_cta')

  return {
    component: 'TideLandingPageCallToAction',
    id: field.drupal_internal__id,
    props: {
      title: field.field_paragraph_title,
      image: image,
      url: link?.url,
      ctaText: link?.text,
      summary: getBody(field.field_paragraph_body?.processed)
    }
  }
}

export const callToActionIncludes = []

export default {
  includes: callToActionIncludes,
  mapping: callToActionMapping,
  contentTypes: ['landing_page']
}
