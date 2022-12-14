import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'
import { FormKitSchemaNode } from '@formkit/core'
import {
  getCounterFields,
  getInputIcons,
  getMinMaxFields,
  getValidation
} from './webform-utils.js'

export interface ITideWebform {
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
  elements: ITideFormElement[],
  tidePageApi
): Promise<FormKitSchemaNode[]> => {
  const fields: any[] = []

  for (const [fieldKey, field] of Object.entries(elements)) {
    let mappedField

    switch (field['#type']) {
      case 'textfield':
        mappedField = {
          $formkit: 'RplFormText',
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getInputIcons(field),
          ...getMinMaxFields(field),
          ...getCounterFields(field)
        }
        break
      case 'email':
        mappedField = {
          $formkit: 'RplFormEmail',
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getInputIcons(field),
          ...getMinMaxFields(field)
        }
        break
      case 'number':
        mappedField = {
          $formkit: 'RplFormNumber',
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getInputIcons(field)
        }
        break
      case 'tel':
        mappedField = {
          $formkit: 'RplFormTel',
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getInputIcons(field),
          ...getMinMaxFields(field)
        }
        break
      case 'url':
        mappedField = {
          $formkit: 'RplFormUrl',
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getInputIcons(field),
          ...getMinMaxFields(field)
        }
        break
      case 'textarea':
        mappedField = {
          $formkit: 'RplFormTextarea',
          id: fieldKey,
          name: fieldKey,
          label: field['#title'],
          disabled: field['#disabled'],
          placeholder: field['#placeholder'],
          rows: field['#rows'],
          help: field['#description'] || field['#help_title'],
          value: field['#default_value'],
          ...getValidation(field),
          ...getMinMaxFields(field),
          ...getCounterFields(field)
        }
        break
      case 'checkbox':
        mappedField = {
          $formkit: 'RplFormCheckbox',
          id: fieldKey,
          name: fieldKey,
          disabled: field['#disabled'],
          // TODO: It's not clear what field we should be using for the 'label' here because it's a new requirement, setting as 'help title' for now
          label: field['#help_title'],
          help: field['#description'],
          checkboxLabel: field['#title'],
          value: field['#default_value'],
          ...getValidation(field)
        }
        break
      case 'webform_privacy_statement':
        mappedField = {
          $formkit: 'RplFormCheckbox',
          id: fieldKey,
          name: fieldKey,
          disabled: field['#disabled'],
          // TODO: It's not clear what field we should be using for the 'label' here because it's a new requirement, setting as 'help title' for now
          label: field['#privacy_statement_heading'],
          help: field['#privacy_statement_content'],
          checkboxLabel: field['#title'],
          value: field['#default_value'],
          ...getValidation(field)
        }
        break
      case 'select':
        mappedField = {
          $formkit: 'RplFormDropdown',
          id: fieldKey,
          name: fieldKey,
          disabled: field['#disabled'],
          placeholder: field['#empty_option'],
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
          ...getValidation(field)
        }
        break
      case 'webform_term_select': {
        const options = await tidePageApi.getTaxonomy(field['#vocabulary'])

        mappedField = {
          $formkit: 'RplFormDropdown',
          id: fieldKey,
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
          ...getValidation(field)
        }
        break
      }
      case 'webform_actions':
        mappedField = {
          $formkit: 'RplFormSubmit',
          name: 'submit',
          variant: 'filled',
          label: field['#submit__label'],
          id: fieldKey,
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
    component: 'RplForm',
    id: field.drupal_internal__id,
    title: field.field_paragraph_title,
    props: {
      id: field?.field_paragraph_webform?.drupal_internal__id,
      schema: await getFormSchemaFromMapping(
        field?.field_paragraph_webform?.elements,
        tidePageApi
      )
    }
  }
}

export const webformIncludes = [
  'field_landing_page_component.field_paragraph_webform'
]
