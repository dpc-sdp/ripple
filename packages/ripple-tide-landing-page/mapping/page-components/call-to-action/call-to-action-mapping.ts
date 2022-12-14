import {
  getBody,
  getImageFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideCallToAction {
  title: string
  image: string
  imageAlt: string
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
      image: image ? image.src : '',
      imageAlt: image ? image.alt : '',
      url: link?.url,
      ctaText: link?.text,
      summary: getBody(field.field_paragraph_body?.processed)
    }
  }
}

export const callToActionIncludes = []
