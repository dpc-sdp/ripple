import { logger } from '@dpc-sdp/ripple-tide-api'

type SupportedStates =
  | 'required'
  | 'disabled'
  | 'enabled'
  | 'visible'
  | 'invisible'

type LogicOperator = 'and' | 'or' | 'xor'
interface Operand {
  fieldName: string
  triggerType: string
  triggerValue: any
}
interface NormalisedRule {
  operator: LogicOperator
  operands: Operand[]
}

/**
 * Extract model name "check_a" from a rule ":input[name=\"check_a\"]"
 * @param {String} rule :input[name=\"check_a\"]
 */
const getNameFromSelector = (rule: string): string => {
  const start = rule.indexOf('"') + 1
  const end = rule.indexOf('"', start + 1)
  return rule.substr(start, end - start)
}

/**
 * Return the first key of an object
 * @param {Object} obj Object with keys
 */
const getFirstObjectKey = (obj): string => {
  if (!obj) {
    return ''
  }

  const keys = Object.getOwnPropertyNames(obj)
  return keys && keys.length ? keys[0] : ''
}

/**
 * Returns an object representing a piece of logic
 * @param {Object} ruleObject the parent object that contains the selector
 * @param {String} selector a field selector e.g. ':input[name=\"check_a\"]'
 */
function convertSelectorToOperand(ruleObject, selector): Operand {
  const fieldName = getNameFromSelector(selector)
  const triggerType = getFirstObjectKey(ruleObject[selector])
  const triggerValue = triggerType ? ruleObject[selector][triggerType] : null
  return { fieldName, triggerType, triggerValue }
}

/**
 * Normalize the rules for processing.
 * Rules may be an {object} or [array (with operator)].
 * This will output a test object.
 * @param {Object} rulesObject webform rules object
 * @param {Object} data form data
 */
const normaliseRule = (rulesObject): NormalisedRule => {
  const rulesType = Array.isArray(rulesObject) ? 'array' : typeof rulesObject
  let operator: LogicOperator = 'and'
  const operands: Operand[] = []

  switch (rulesType) {
    case 'array':
      // Used for 'or' / 'xor' operators.
      rulesObject.forEach((item) => {
        if (typeof item === 'object') {
          const selector = getFirstObjectKey(item)
          operands.push(convertSelectorToOperand(item, selector))
        } else {
          operator = item
        }
      })
      break
    case 'object':
      // Used for 'and' operator.
      Object.getOwnPropertyNames(rulesObject).forEach((selector) => {
        operands.push(convertSelectorToOperand(rulesObject, selector))
      })
      break
    default:
      logger.warn(`${rulesType} rules variable is not supported.`, {
        label: 'Webform'
      })
      break
  }
  return { operator, operands }
}

const getFormkitLogicForOperand = (operand: Operand): string => {
  switch (operand.triggerType) {
    case 'empty':
      return `$get(${operand.fieldName}).value === '' || $get(${operand.fieldName}).value === null`
    case 'filled':
      return `$isFilled($get(${operand.fieldName}).value)`
    case 'checked':
      return `$isChecked($get(${operand.fieldName}).value)`
    case 'unchecked':
      return `$negate($isChecked($get(${operand.fieldName}).value))`
    case 'value':
      if (typeof operand.triggerValue === 'string') {
        return `$isEqual($get(${operand.fieldName}).value, ${operand.triggerValue})`
      } else if (operand.triggerValue['pattern']) {
        return `$isPatternMatch($get(${operand.fieldName}).value, "${operand.triggerValue['pattern']}")`
      } else if (operand.triggerValue['!pattern']) {
        return `$negate($isPatternMatch($get(${operand.fieldName}).value, "${operand.triggerValue['!pattern']}"))`
      } else if (operand.triggerValue['less']) {
        return `$difference($get(${operand.fieldName}).value, ${operand.triggerValue['less']}) < 0`
      } else if (operand.triggerValue['greater']) {
        return `$difference($get(${operand.fieldName}).value, ${operand.triggerValue['greater']}) > 0`
      }
      return ''
    case '!value':
      return `$negate($isEqual($get(${operand.fieldName}).value, ${operand.triggerValue}))`
    default:
      return ''
  }
}

const toFormkitExpression = (rule: NormalisedRule): string => {
  const expressions = rule.operands.map(getFormkitLogicForOperand)

  if (rule.operator === 'and') {
    return expressions.join(' && ')
  }

  if (rule.operator === 'or') {
    return expressions.join(' || ')
  }

  // The 'xor' operator is to support the 'One of' option in drupal.
  if (rule.operator === 'xor') {
    return `$xor(${expressions.join(', ')})`
  }

  return ''
}

/**
 * Transforms the drupal '#states' data into formkit conditional logic which can
 * then be spread onto the field mapping.
 * https://formkit.com/essentials/schema#conditionals
 *
 * @param {Object} field
 */
export const getConditionals = (
  field
): {
  [key: string]: string
} => {
  const states = field['#states']

  return (Object.keys(states || {}) as SupportedStates[]).reduce(
    (result, state: SupportedStates) => {
      const rule = normaliseRule(states[state])
      const expression = toFormkitExpression(rule)

      switch (state) {
        case 'required':
          return { ...result, required: expression }
        case 'disabled':
          return { ...result, disabled: expression }
        case 'enabled':
          return { ...result, disabled: `$negate(${expression})` }
        case 'visible':
          return { ...result, if: expression }
        case 'invisible':
          return { ...result, if: `$negate(${expression})` }
        default:
          logger.warn(`Conditional logic state "${state}" is not supported.`, {
            label: 'Webform'
          })
          return result
      }
    },
    {}
  )
}
