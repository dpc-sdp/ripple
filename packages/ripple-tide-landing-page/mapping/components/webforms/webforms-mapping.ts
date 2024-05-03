import type { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { TidePageApi } from '@dpc-sdp/ripple-tide-api'
import type { TideWebform, ApiField } from '@dpc-sdp/ripple-tide-webform/types'
import { getFormSchemaFromMapping } from '@dpc-sdp/ripple-tide-webform/mapping'

const componentMapping = async (field: ApiField, tidePageApi: TidePageApi) => {
  return {
    title: field.field_paragraph_title,
    formId: field.field_paragraph_webform.meta.drupal_internal__target_id,
    hideFormOnSubmit:
      field.field_paragraph_webform.settings?.confirmation_type === 'inline',
    successMessageTitle:
      field.field_paragraph_webform.settings?.confirmation_title ||
      'Form submitted',
    successMessageHTML:
      field.field_paragraph_webform.settings?.confirmation_message ||
      'Thank you! Your response has been submitted.',
    errorMessageTitle: 'Form not submitted',
    errorMessageHTML:
      field.field_paragraph_webform.settings?.submission_exception_message ||
      'We are experiencing a server error. Please try again, otherwise contact us.',
    schema: await getFormSchemaFromMapping(
      field.field_paragraph_webform,
      tidePageApi
    )
  }
}
export const webformMapping = async (
  field: ApiField,
  // @ts-expect-error unused
  page,
  tidePageApi: TidePageApi
): Promise<TideDynamicPageComponent<TideWebform>> => {
  return {
    component: 'TideLandingPageWebForm',
    id: field.drupal_internal__id,
    title: field.field_paragraph_title,
    props: await componentMapping(field, tidePageApi)
  }
}

export const webformIncludes = [
  'field_landing_page_component.field_paragraph_webform'
]

export default {
  includes: webformIncludes,
  mapping: webformMapping,
  contentTypes: ['landing_page']
}
