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
  summary: string
}

export const callToActionMapping = (
  field
): TideDynamicPageComponent<ITideCallToAction> => {
  const image = getImageFromField(
    field,
    'field_paragraph_media.field_media_image'
  )

  return {
    component: 'TideLandingPageCallToAction',
    id: field.drupal_internal__id,
    props: {
      title: field.field_paragraph_title,
      image: image ? image.src : '',
      imageAlt: image ? image.alt : '',
      url: getLinkFromField(field, 'field_paragraph_cta'),
      summary: getBody(field.field_paragraph_body?.processed)
    }
  }
}

export const callToActionIncludes = []
