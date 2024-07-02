import { getBody, TidePageApi } from '@dpc-sdp/ripple-tide-api'
import { FormKitSchemaNode } from '@formkit/core'
import {
  getInputIcons,
  getValidationAndConditionals
} from './../server/webform-utils'
import { getAdvancedAddressMapping } from './webforms-address'
import type { TideWebformElement, ApiWebForm } from './../types'

interface CustomInputsConfig {
  [key: string]: {
    [key: string]: any
    mapping: Function
  }
}

const appConfig = useAppConfig().ripple as CustomInputsConfig
const customInputs: CustomInputsConfig = appConfig.customInputs || {}

export const getFormSchemaFromMapping = async (
  webform: ApiWebForm,
  tidePageApi: TidePageApi
): Promise<FormKitSchemaNode[]> => {
  const elements: TideWebformElement[] = webform.elements || []
  const fields = []
  const formId = webform.drupal_internal__id

  for (const [fieldKey, fieldData] of Object.entries(elements)) {
    let mappedField
    const field: TideWebformElement = { ...fieldData, formId }
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
          layout:
            field['#options_display'] === 'side_by_side' ? 'inline' : 'block',
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
          layout:
            field['#options_display'] === 'side_by_side' ? 'inline' : 'block',
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
          options: (options || []).map(
            (term: { drupal_internal__tid: string; name: string }) => {
              return {
                id: `${term.drupal_internal__tid}`,
                value: `${term.drupal_internal__tid}`,
                label: term.name
              }
            }
          ),
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
        if (Object.keys(customInputs).includes(field['#type'])) {
          mappedField = customInputs[field['#type']].mapping(
            fieldID,
            field,
            fieldKey
          )
        } else {
          mappedField = {
            $el: 'div',
            attrs: {
              class: 'rpl-form__outer rpl-form__input--unsupported'
            },
            children: [`"${field['#type']}" is not yet supported`]
          }
        }
    }

    fields.push(mappedField)
  }

  return fields
}
