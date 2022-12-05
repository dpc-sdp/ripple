import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'
import { FormKitSchemaNode } from '@formkit/core'

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
  const getValidation = (
    field
  ): {
    validation: string
    validationMessages: Record<string, string>
    validationMeta: string | undefined
  } => {
    const validationStates: string[] = []
    const validationMessages: Record<string, string> = {}
    const validationMeta = undefined

    // Validation states from Drupal
    // Currently supports required, pattern
    if (field['#required']) {
      const requiredMessage =
        field['#required_error'] || `${field['#title']} is required`

      validationStates.push('required')
      validationMessages['required'] = requiredMessage

      // The formkit required rule accepts `false` as a value, so we need to use add the 'accepted' rule as well
      if (field['#type'] === 'checkbox') {
        validationStates.push('accepted')
        validationMessages['accepted'] = requiredMessage
      }
    }
    if (field['#pattern']) {
      validationStates.push(`matches:${field['#pattern']}`)
      validationMessages['matches'] =
        field['#pattern_error'] ||
        `${field['#title']} must match the pattern ${field['#pattern']}`
    }
    if (field['#type'] === 'email') {
      validationStates.push('email')
      validationMessages[
        'email'
      ] = `${field['#title']} must be a valid email address`
    }
    if (typeof field['#multiple'] === 'number') {
      validationStates.push(`length:0,${field['#multiple']}`)
      validationMessages['length'] =
        field['#multiple_error'] ||
        `More than ${field['#multiple']} selections are not allowed`
    }

    return {
      validation: validationStates.join('|'),
      validationMessages,
      validationMeta
    }
  }

  const getInputIcons = (
    field
  ): { prefixIcon?: string; suffixIcon?: string } => {
    if (field['#field_prefix']) {
      return {
        prefixIcon: `icon-${field['#field_prefix']}`
      }
    }
    return {}
  }

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
          ...getInputIcons(field)
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
          ...getInputIcons(field)
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
