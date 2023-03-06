import {
  getBody,
  addAnchorLinksToHTML,
  getAnchorLinksFromHTML
} from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideBasicText {
  html: string | null
}

export const basicTextMapping = (
  field
): TideDynamicPageComponent<ITideBasicText> => {
  const rawHTML = getBody(field?.field_paragraph_body?.processed)

  return {
    component: 'RplContent',
    id: `${field.drupal_internal__id}`,
    internalAnchors: getAnchorLinksFromHTML(rawHTML, true),
    props: {
      html: addAnchorLinksToHTML(rawHTML)
    }
  }
}

export const basicTextIncludes = []

export default {
  includes: basicTextIncludes,
  mapping: basicTextMapping,
  contentTypes: ['landing_page']
}
