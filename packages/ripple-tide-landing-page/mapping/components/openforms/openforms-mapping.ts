import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideOpenForms {
  formLink: string
}

export const openFormsMapping = (
  field
): TideDynamicPageComponent<ITideOpenForms> => {
  return {
    component: 'TideLandingPageOpenForms',
    id: field.drupal_internal__id.toString(),
    props: {
      formLink: field.field_form_link.uri
    }
  }
}

export const openFormsIncludes = []

export default {
  includes: openFormsIncludes,
  mapping: openFormsMapping,
  contentTypes: ['landing_page']
}
