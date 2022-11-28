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

const getFormSchemaFromMapping = (elements): FormKitSchemaNode[] => {
  const fields = Object.keys(elements).map((fieldKey: string) => {
    const field: ITideFormElement = elements[fieldKey]

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

    switch (field['#type']) {
      case 'textfield':
        return {
          $formkit: 'RplFormText',
          name: fieldKey,
          label: field['#title'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          ...getValidation(field),
          ...getInputIcons(field)
        }
      case 'email':
        return {
          $formkit: 'RplFormEmail',
          name: fieldKey,
          label: field['#title'],
          id: fieldKey,
          help: field['#description'] || field['#help_title'],
          ...getValidation(field),
          ...getInputIcons(field)
        }
      case 'checkbox':
        return {
          $formkit: 'RplFormCheckbox',
          id: fieldKey,
          name: fieldKey,
          // TODO: It's not clear what field we should be using for the 'label' here because it's a new requirement, setting as 'help title' for now
          label: field['#help_title'],
          help: field['#description'],
          checkboxLabel: field['#title'],
          ...getValidation(field)
        }
      case 'webform_actions':
        return {
          $formkit: 'RplFormSubmit',
          name: 'submit',
          variant: 'filled',
          label: field['#submit__label'],
          id: fieldKey,
          ...getInputIcons(field)
        }
    }
    return {
      $el: 'div',
      attrs: {
        class: 'rpl-form__outer rpl-form__input--unsupported'
      },
      children: [`"${field['#type']}" is not yet supported`]
    }
  })
  return fields
}

export const webformMapping = (
  field
): TideDynamicPageComponent<ITideWebform> => {
  return {
    component: 'RplForm',
    id: field.drupal_internal__id,
    title: field.field_paragraph_title,
    props: {
      id: field?.field_paragraph_webform?.drupal_internal__id,
      schema: getFormSchemaFromMapping(field?.field_paragraph_webform?.elements)
    }
  }
}

export const webformIncludes = [
  'field_landing_page_component.field_paragraph_webform'
]
