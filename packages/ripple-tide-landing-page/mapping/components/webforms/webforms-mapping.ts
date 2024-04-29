import { TideDynamicPageComponent, getBody } from '@dpc-sdp/ripple-tide-api'
import { FormKitSchemaNode } from '@formkit/core'
import { getInputIcons, getValidationAndConditionals } from './webform-utils.js'
import { getAdvancedAddressMapping } from './webforms-address'

export interface ITideWebform {
  formId: string
  successMessageHTML: string
  errorMessageHTML: string
  schema: FormKitSchemaNode
}

export interface ITideFormElement {
  '#type': string
  '#title': string
  '#required'?: boolean
  '#required_error'?: string
  '#description'?: string
  '#help_title'?: string
}

const getFormSchemaFromMapping = async (
  webform,
  tidePageApi
): Promise<FormKitSchemaNode[]> => {
  const elements: ITideFormElement[] = webform?.elements || []
  const fields: any[] = []
  const formId = webform?.drupal_internal__id

  for (const [fieldKey, fieldData] of Object.entries(elements)) {
    let mappedField
    const field = { ...fieldData, formId }
    const fieldID = `${formId}_${fieldKey}`

    switch (field['#type']) {
      case 'hidden':
        mappedField = {
          $formkit: 'RplFormHidden',
          key: fieldKey,
          name: fieldKey,
          id: fieldID,
          value: field['#default_value'],
          pii: false
        }
        break
      case 'textfield':
        mappedField = {
          $formkit: 'RplFormText',
          key: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldID,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      case 'email':
        mappedField = {
          $formkit: 'RplFormEmail',
          key: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldID,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      case 'number':
        mappedField = {
          $formkit: 'RplFormNumber',
          key: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldID,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          min: field['#min'],
          max: field['#max'],
          step: field['#step'],
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      case 'tel':
        mappedField = {
          $formkit: 'RplFormTel',
          key: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldID,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      case 'url':
        mappedField = {
          $formkit: 'RplFormUrl',
          key: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldID,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      case 'textarea':
        mappedField = {
          $formkit: 'RplFormTextarea',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          rows: field['#rows'],
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidationAndConditionals(field)
        }
        break
      case 'date':
        mappedField = {
          $formkit: 'RplFormDate',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          dateFormat: 'yyyy-MM-dd',
          ...getValidationAndConditionals(field)
        }
        break
      case 'checkbox':
        mappedField = {
          $formkit: 'RplFormCheckbox',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          label: field['#help_title'],
          help: field['#description'],
          checkboxLabel: field['#title'],
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break
      case 'webform_privacy_statement':
        mappedField = {
          $formkit: 'RplFormCheckbox',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          // TODO: It's not clear what field we should be using for the 'label' here because it's a new requirement, setting as 'help title' for now
          label: field['#privacy_statement_heading'],
          help: field['#privacy_statement_content'],
          checkboxLabel: field['#title'],
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break
      case 'select':
        mappedField = {
          $formkit: 'RplFormDropdown',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          placeholder: field['#empty_option'],
          label: field['#title'],
          help: field['#description'],
          multiple: !!field['#multiple'],
          options: Object.entries(field['#options'] || {}).map(
            ([value, label]) => {
              return {
                id: value,
                value,
                label
              }
            }
          ),
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break
      case 'radios':
        mappedField = {
          $formkit: 'RplFormRadioGroup',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          label: field['#title'],
          help: field['#description'],
          options: Object.entries(field['#options'] || {}).map(
            ([value, label]) => {
              return {
                id: value,
                value,
                label
              }
            }
          ),
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break
      case 'checkboxes':
        mappedField = {
          $formkit: 'RplFormCheckboxGroup',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          label: field['#title'],
          help: field['#description'],
          options: Object.entries(field['#options'] || {}).map(
            ([value, label]) => {
              return {
                id: value,
                value,
                label
              }
            }
          ),
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break

      case 'webform_term_select': {
        const options = await tidePageApi.getTaxonomy(field['#vocabulary'])

        mappedField = {
          $formkit: 'RplFormDropdown',
          key: fieldKey,
          id: fieldID,
          name: fieldKey,
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          label: field['#title'],
          help: field['#description'],
          multiple: !!field['#multiple'],
          options: (options || []).map((term) => {
            return {
              id: `${term.drupal_internal__tid}`,
              value: `${term.drupal_internal__tid}`,
              label: term.name
            }
          }),
          value: field['#default_value'],
          pii: false,
          ...getValidationAndConditionals(field)
        }
        break
      }
      case 'address':
        mappedField = getAdvancedAddressMapping(fieldKey, field, formId)
        break
      case 'webform_markup':
        mappedField = {
          $formkit: 'RplFormContent',
          key: fieldKey,
          html: getBody(field['#markup']),
          ...getValidationAndConditionals(field)
        }
        break
      case 'processed_text':
        mappedField = {
          $formkit: 'RplFormContent',
          key: fieldKey,
          html: getBody(field['#text']),
          ...getValidationAndConditionals(field)
        }
        break
      case 'webform_horizontal_rule':
        mappedField = {
          $formkit: 'RplFormDivider',
          key: fieldKey,
          ...getValidationAndConditionals(field)
        }
        break
      case 'label':
        mappedField = {
          $formkit: 'RplFormLabel',
          key: fieldKey,
          label: field['#title'],
          required: field['#required'],
          ...getValidationAndConditionals(field)
        }
        break
      case 'webform_actions':
        mappedField = {
          $formkit: 'RplFormActions',
          key: fieldKey,
          name: 'submit',
          variant: 'filled',
          label: field['#submit__label'],
          id: fieldID,
          displayResetButton: !!webform?.settings?.form_reset,
          ...getValidationAndConditionals(field),
          ...getInputIcons(field)
        }
        break
      default:
        mappedField = {
          $el: 'div',
          attrs: {
            class: 'rpl-form__outer rpl-form__input--unsupported'
          },
          children: [`"${field['#type']}" is not yet supported`]
        }
    }

    fields.push(mappedField)
  }

  return fields
}

export const webformMapping = async (
  field,
  page,
  tidePageApi
): TideDynamicPageComponent<ITideWebform> => {
  return {
    component: 'TideLandingPageWebForm',
    id: field.drupal_internal__id,
    title: field.field_paragraph_title,
    props: {
      title: field.field_paragraph_title,
      formId: field?.field_paragraph_webform?.drupal_internal__id,
      hideFormOnSubmit:
        field?.field_paragraph_webform?.settings?.confirmation_type ===
        'inline',
      successMessageTitle:
        field?.field_paragraph_webform?.settings?.confirmation_title ||
        'Form submitted',
      successMessageHTML:
        field?.field_paragraph_webform?.settings?.confirmation_message ||
        'Thank you! Your response has been submitted.',
      errorMessageTitle: 'Form not submitted',
      errorMessageHTML:
        field?.field_paragraph_webform?.settings
          ?.submission_exception_message ||
        'We are experiencing a server error. Please try again, otherwise contact us.',
      schema: await getFormSchemaFromMapping(
        field?.field_paragraph_webform,
        tidePageApi
      )
    }
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
