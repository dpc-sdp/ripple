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

export const getValidation = (
  field
): {
  validation: string[][]
  validationMessages: Record<string, string>
  validationMeta: string | undefined
} => {
  const validation: string[][] = []
  const validationMessages: Record<string, string> = {}
  const validationMeta = undefined

  // Validation states from Drupal
  // Currently supports required, pattern
  if (field['#required']) {
    const requiredMessage =
      field['#required_error'] || `${field['#title']} is required`

    validation.push(['required'])
    validationMessages['required'] = requiredMessage

    // The formkit required rule accepts `false` as a value, so we need to use add the 'accepted' rule as well
    if (
      field['#type'] === 'checkbox' ||
      field['#type'] === 'webform_privacy_statement'
    ) {
      validation.push(['accepted'])
      validationMessages['accepted'] = requiredMessage
    }
  }
  if (field['#pattern']) {
    validation.push(['matches', field['#pattern']])
    validationMessages['matches'] =
      field['#pattern_error'] ||
      `${field['#title']} must match the pattern ${field['#pattern']}`
  }
  if (field['#type'] === 'email') {
    validation.push(['email'])
    validationMessages[
      'email'
    ] = `${field['#title']} must be a valid email address`
  }
  if (typeof field['#multiple'] === 'number') {
    validation.push(['length', `0,${field['#multiple']}`])
    validationMessages['length'] =
      field['#multiple_error'] ||
      `More than ${field['#multiple']} selections are not allowed`
  }
  // Min/max length can set in Drupal via the main min/maxlength fields or via the counter_min/max fields
  // setting the counter min/max values overrides the main min/maxlength fields
  if (
    (field['#minlength'] && field['#maxlength']) ||
    (field['#counter_type'] && field['#counter_type'] === 'character')
  ) {
    let min = field['#minlength'] || 0
    let max = field['#maxlength'] || null
    if (field['#counter_type']) {
      min = field['#counter_minimum'] || min
      max = field['#counter_maximum'] || max
    }
    if (max) {
      validation.push(['length', min, max])
      validationMessages['length'] = min
        ? `You must enter between ${min} and ${max} characters`
        : `You can enter a maximum of ${min} characters`
    } else if (min) {
      validation.push(['length', min])
      validationMessages['length'] = `You must enter at least ${min} characters`
    }
  }
  if (field['#counter_type'] && field['#counter_type'] === 'word') {
    validation.push([
      `matches`,
      `/^\\W*(\\w+(\\W+|$)){${field['#counter_minimum']},${field['#counter_maximum']}}$/`
    ])
    validationMessages[
      'matches'
    ] = `You must enter between ${field['#counter_minimum']} and ${field['#counter_maximum']} words`
  }

  return {
    validation,
    validationMessages,
    validationMeta
  }
}
