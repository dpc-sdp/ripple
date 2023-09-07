const getRequiredRules = (field) => {
  if (
    field['#type'] === 'checkbox' ||
    field['#type'] === 'webform_privacy_statement'
  ) {
    return [['required'], ['accepted']]
  }

  return [['required']]
}

export const getValidation = (
  field,
  requiredCondition
): {
  validation: string[][] | any
  validationMessages: Record<string, string>
  validationMeta: string | undefined
} => {
  let validation: any[][] = []
  const validationMessages: Record<string, string> = {}
  const validationMeta = undefined

  const requiredMessage =
    field['#required_error'] || `${field['#title']} is required`
  validationMessages['required'] = requiredMessage
  validationMessages['accepted'] = requiredMessage

  if (field['#pattern']) {
    validation.push(['matches', `/${field['#pattern']}/`])
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

  if (field['#type'] === 'url') {
    validation.push(['url'])
    validationMessages['url'] = `${field['#title']} must be a valid URL`
  }

  if (field['#type'] === 'number') {
    validation.push(['number'])
    validationMessages['number'] = `${field['#title']} must be a number`

    if (typeof field['#min'] === 'number') {
      validation.push(['min', field['#min']])
      validationMessages[
        'min'
      ] = `${field['#title']} must be at least ${field['#min']}`
    }

    if (typeof field['#max'] === 'number') {
      validation.push(['max', field['#max']])
      validationMessages[
        'max'
      ] = `${field['#title']} must be no greater than ${field['#max']}`
    }
  }

  if (field['#type'] === 'date') {
    validation.push(['date_format', 'YYYY-MM-DD'])
    validationMessages[
      'date_format'
    ] = `${field['#title']} must be a valid date in the format DD MM YYYY`
  }

  if (typeof field['#multiple'] === 'number') {
    validation.push(['length', 0, field['#multiple']])
    validationMessages['length'] =
      field['#multiple_error'] ||
      `More than ${field['#multiple']} selections are not allowed`
  }

  // Min/max length can set in Drupal via the main min/maxlength fields or via the counter_min/max fields
  // setting the counter min/max values overrides the main min/maxlength fields
  if (
    field['#minlength'] ||
    field['#maxlength'] ||
    field['#counter_minimum'] ||
    field['#counter_maximum']
  ) {
    const type = field['#counter_type'] === 'word' ? 'words' : 'characters'
    const validationType = type === 'words' ? 'matches' : 'length'
    let min = field['#minlength'] || 0
    let max = field['#maxlength'] || ''

    if (field['#counter_minimum'] || field['#counter_maximum']) {
      min = field['#counter_minimum'] || min
      max = field['#counter_maximum'] || max
    }

    if (max) {
      validationMessages[validationType] = min
        ? `You must enter between ${min} and ${max} ${type}`
        : `You can enter a maximum of ${max} ${type}`
    } else if (min) {
      validationMessages[
        validationType
      ] = `You must enter at least ${min} ${type}`
    }

    if (validationType === 'matches') {
      // This is a regex that counts words and matches if the word count is between `min` and `max`
      // A word in this context is any group of non-whitespace characters (\S+)
      validation.push([validationType, `/^\\s*(\\S+(\\s+|$)){${min},${max}}$/`])
    } else {
      validation.push(max ? [validationType, min, max] : [validationType, min])
    }
  }

  const conditionallyValidation = {
    if: requiredCondition,
    then: [...validation, ...getRequiredRules(field)],
    else: [...validation]
  }

  if (field['#required'] && !requiredCondition) {
    validation = validation.concat(getRequiredRules(field))
  }

  return {
    validation: requiredCondition ? conditionallyValidation : validation,
    validationMessages,
    validationMeta
  }
}
