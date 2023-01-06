import { FormKitSchemaNode } from '@formkit/core'
export const getTideFormFields = (field) => {
  if (field?.elements) {
    const fields = new Array<FormKitSchemaNode>()
    for (const el in field.elements) {
      const fieldConfig = field.elements[el]
      const type = fieldConfig['#type']
      const sharedFields = {
        id: el,
        validation: (): string => {
          const validationRules = new Array<string>()
          if (fieldConfig.required) {
            validationRules.push('required')
          }
          return validationRules.join('|')
        }
      }
      switch (type) {
        case 'webform_actions':
          fields.push({
            ...sharedFields,
            $formkit: 'submit',
            label: fieldConfig['#title']
          })
          break
        case 'textarea':
          fields.push({
            ...sharedFields,
            $formkit: 'text',
            label: fieldConfig['#title'],
            rows: fieldConfig['#rows'],
            maxlength: fieldConfig['#counter_maximum']
          })
          break
        case 'hidden':
          fields.push({
            ...sharedFields,
            $formkit: 'hidden',
            value: fieldConfig['#value']
          })
          break
        case 'radios':
          fields.push({
            ...sharedFields,
            $formkit: 'radio',
            label: fieldConfig['#title'],
            options: fieldConfig['#options'].split('_')
          })
          break

        default:
          break
      }
    }
    return fields
  }
}
