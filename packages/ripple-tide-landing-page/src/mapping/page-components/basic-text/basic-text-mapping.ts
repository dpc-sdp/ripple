import { getBody } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideBasicText {
  html: string | null
}

export const basicTextMapping = (
  field
): TideDynamicPageComponent<ITideBasicText> => {
  return {
    component: 'RplContent',
    id: `${field.drupal_internal__id}`,
    props: {
      html: getBody(field?.field_paragraph_body?.processed)
    }
  }
}

export const basicTextIncludes = []
