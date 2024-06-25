import { getConditionals } from './webform-conditional-logic'
import { getValidation } from './webform-validation'

const logger = {
  warn: (message: string, props: { label: string }) => {
    console.warn(props.label, message)
  }
}

export const getValidationAndConditionals = (field: {}) => {
  const conditionals = getConditionals(field, logger)

  const requiredCondition = conditionals.required
  const validation = getValidation(field, requiredCondition)

  return {
    ...conditionals,
    ...validation
  }
}

export const getInputIcons = (field: {
  [key: string]: string | undefined
}): { prefixIcon?: string; suffixIcon?: string } => {
  if (field['#field_prefix']) {
    return {
      prefixIcon: `icon-${field['#field_prefix']}`
    }
  }
  return {}
}

export const getMinMaxFields = (field: {
  [key: string]: string | undefined
}): { minlength?: string; maxlength?: string } => {
  let minlength = field['#minlength']
  let maxlength = field['#maxlength']

  // Counter fields override the main min/max  fields
  if (field['#counter_type'] && field['#counter_type'] === 'character') {
    minlength = field['#counter_minimum'] || minlength
    maxlength = field['#counter_maximum'] || maxlength
  }

  return { minlength, maxlength }
}

export const getCounterFields = (field: {
  [key: string]: string | undefined
}): { counter?: string; counterMin?: string; counterMax?: string } => {
  return {
    counter: field['#counter_type'],
    counterMin: field['#counter_minimum'],
    counterMax: field['#counter_maximum']
  }
}
