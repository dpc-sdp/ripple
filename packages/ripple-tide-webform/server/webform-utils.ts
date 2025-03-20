import { logger } from '@dpc-sdp/ripple-tide-api'
import { getConditionals } from './../mapping/webform-conditional-logic'
import { getValidation } from './../mapping/webform-validation'

export const getValidationAndConditionals = (field: {}) => {
  const conditionals = getConditionals(field, logger)

  const requiredCondition = conditionals.required
  const validation = getValidation(field, requiredCondition)

  return {
    ...conditionals,
    ...validation
  }
}

export {
  getInputIcons,
  getMinMaxFields,
  getCounterFields
} from './../mapping/webform-utils'
