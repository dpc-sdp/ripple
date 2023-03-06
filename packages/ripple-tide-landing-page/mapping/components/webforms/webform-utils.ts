import { getConditionals } from './webform-conditional-logic.js'
import { getValidation } from './webform-validation.js'

export const getValidationAndConditionals = (field) => {
  const conditionals = getConditionals(field)

  const requiredCondition = conditionals.required
  const validation = getValidation(field, requiredCondition)

  return {
    ...conditionals,
    ...validation
  }
}

export const getInputIcons = (
  field
): { prefixIcon?: string; suffixIcon?: string } => {
  if (field['#field_prefix']) {
    return {
      prefixIcon: `icon-${field['#field_prefix']}`
    }
  }
  return {}
}

export const getMinMaxFields = (
  field
): { minlength?: string; maxlength?: string } => {
  let minlength = field['#minlength']
  let maxlength = field['#maxlength']

  // Counter fields override the main min/max  fields
  if (field['#counter_type'] && field['#counter_type'] === 'character') {
    minlength = field['#counter_minimum'] || minlength
    maxlength = field['#counter_maximum'] || maxlength
  }

  return { minlength, maxlength }
}

export const getCounterFields = (
  field
): { counter?: string; counterMin?: string; counterMax?: string } => {
  return {
    counter: field['#counter_type'],
    counterMin: field['#counter_minimum'],
    counterMax: field['#counter_maximum']
  }
}
