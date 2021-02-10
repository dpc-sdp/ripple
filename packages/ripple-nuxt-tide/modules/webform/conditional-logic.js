import { logger } from './../../lib/core'

/**
 * Run tests for field.
 * Will update the field object based on it's state.
 * Supports the following states:
 * - required
 * - disabled
 * - enabled
 * - visible
 * - invisible
 * @param {Object} field
 * @param {Object} data uses data.model property
 */
function testField (field, data) {
  for (const state in field.states) {
    const test = prepareTest(field.states[state], data)
    const isPass = performTest(test)

    // Apply state
    switch (state) {
      case 'required':
        field.required = isPass
        // Remove 'required' from validator array.
        const idxRequired = field.validator.indexOf('required')
        if (isPass && idxRequired < 0) {
          field.validator.push('required')
        } else if (!isPass && idxRequired >= 0) {
          field.validator.splice(idxRequired, 1)
        }
        break

      case 'disabled':
        field.disabled = isPass
        break

      case 'enabled':
        const enable = isPass
        field.disabled = !enable
        break

      case 'visible':
        field.visible = isPass
        break

      case 'invisible':
        const invisible = isPass
        field.visible = !invisible
        break

      default:
        logger.warn('Form: State "%s" is not supported.', state, { label: 'Webform' })
        break
    }
  }
}

/**
 * Normalize the rules for processing.
 * Rules may be an {object} or [array (with operator)].
 * This will output a test object.
 * @param {Object} rulesObject webform rules object
 * @param {Object} data form data
 */
function prepareTest (rulesObject, data) {
  const rulesType = Array.isArray(rulesObject) ? 'array' : typeof rulesObject
  let operator = 'and'
  let rules = []

  switch (rulesType) {
    case 'array':
      // Used on 'or' / 'xor' operators.
      rulesObject.forEach(item => {
        if (typeof item === 'object') {
          const selector = getFirstObjectKey(item)
          rules.push(convertSelectorToRule(item, selector, data))
        } else {
          operator = item
        }
      })
      break
    case 'object':
      // Used on 'and' operator.
      Object.getOwnPropertyNames(rulesObject).forEach(selector => {
        if (selector !== '__ob__') {
          rules.push(convertSelectorToRule(rulesObject, selector, data))
        }
      })
      break
    default:
      logger.warn('Form: %s rules variable is not supported.', rulesType, { label: 'Webform' })
      break
  }
  return { operator, rules }
}

/**
 * Returns an object with the core testing variables.
 * @param {Object} ruleObject the parent object that contains the selector
 * @param {String} selector a field selector e.g. ':input[name=\"check_a\"]'
 * @param {Object} data uses data.model property
 */
function convertSelectorToRule (ruleObject, selector, data) {
  const modelName = getNameFromRule(selector)
  const modelValue = data.model[modelName]
  const triggerName = getFirstObjectKey(ruleObject[selector])
  const triggerValue = ruleObject[selector][triggerName]
  return { modelName, modelValue, triggerName, triggerValue }
}

/**
 * Perform the test.
 * Returns true if tests pass.
 * @param {Object} test
 */
function performTest (test) {
  const results = test.rules.map(rule => performTriggerCheck(rule))
  return performOperatorCheck(test.operator, results)
}

/**
 * Given a rule, check it's trigger against it's model value.
 * Does not support following triggers:
 * - expanded
 * - collapsed
 * @param {Object} rule
 */
function performTriggerCheck (rule) {
  let result = true
  switch (rule.triggerName) {
    case 'empty':
      result = (rule.modelValue == null || rule.modelValue === '')
      break
    case 'filled':
      result = (typeof rule.modelValue === 'number') ? !isNaN(rule.modelValue) : !(rule.modelValue == null || rule.modelValue === '')
      break
    case 'checked':
      // This will only work with Drupal Webform "checkbox", not "checkboxes". "checkboxes" is not supported form element at this stage.
      result = (rule.modelValue === true)
      break
    case 'unchecked':
      // This will only work with Drupal Webform "checkbox", not "checkboxes". "checkboxes" is not supported form element at this stage.
      result = (rule.modelValue == null || rule.modelValue === false)
      break
    case 'value':
      if (typeof rule.triggerValue === 'string') {
        // value
        result = (rule.modelValue === rule.triggerValue)
        if (rule.modelValue && typeof rule.modelValue === 'number') {
          const intTargetValue = parseFloat(rule.modelValue)
          const intTriggerValue = parseFloat(rule.triggerValue)
          result = (intTargetValue === intTriggerValue)
        }
      } else if (rule.triggerValue['pattern']) {
        // pattern
        if (rule.modelValue) {
          if (typeof rule.modelValue === 'number') {
            const regEx = new RegExp(rule.triggerValue['pattern'])
            const matches = regEx.exec(rule.modelValue)
            result = (matches && matches.length > 0)
          } else {
            const matches = rule.modelValue.match(new RegExp(rule.triggerValue['pattern']))
            result = (matches && matches.length > 0)
          }
        } else {
          result = false
        }
      } else if (rule.triggerValue['!pattern']) {
        // not pattern
        if (rule.modelValue) {
          if (typeof rule.modelValue === 'number') {
            const regEx = new RegExp(rule.triggerValue['!pattern'])
            const matches = regEx.exec(rule.modelValue)
            result = (!matches || matches.length === 0)
          } else {
            const matches = rule.modelValue.match(new RegExp(rule.triggerValue['!pattern']))
            result = (!matches || matches.length === 0)
          }
        } else {
          result = false
        }
      } else if (rule.triggerValue['less']) {
        // less
        const intModelValue = parseFloat(rule.modelValue)
        const intTriggerValue = parseFloat(rule.triggerValue['less'])
        result = (intModelValue < intTriggerValue)
      } else if (rule.triggerValue['greater']) {
        // greater
        const intModelValue = parseFloat(rule.modelValue)
        const intTriggerValue = parseFloat(rule.triggerValue['greater'])
        result = (intModelValue > intTriggerValue)
      }
      break
    case '!value':
      result = (rule.modelValue !== rule.triggerValue)
      break
    default:
      logger.warn('Form: Trigger %s is not supported.', rule.triggerName, { label: 'Webform' })
      break
  }
  return result
}

/**
 * Given an operator and list of results, will determine if the test has passed.
 * @param {String} operator and / or / xor
 * @param {Array} results results of all tests
 */
function performOperatorCheck (operator, results) {
  let isPass = false
  switch (operator) {
    case 'and':
      let andCount = 0
      // All must be true
      for (let i = 0; i < results.length; i++) {
        if (results[i] === true) {
          andCount++
        }
      }
      isPass = (andCount === results.length)
      break
    case 'or':
      // Any can be true
      for (let i = 0; i < results.length; i++) {
        if (results[i] === true) {
          isPass = true
          break
        }
      }
      break
    case 'xor':
      let xorCount = 0
      // Only one must be true
      for (let i = 0; i < results.length; i++) {
        if (results[i] === true) {
          xorCount++
        }
      }
      isPass = (xorCount === 1)
      break
    default:
      logger.warn('Form: Operator %s not supported.', operator, { label: 'Webform' })
      break
  }
  return isPass
}

/**
 * Extract model name "check_a" from a rule ":input[name=\"check_a\"]"
 * @param {String} rule :input[name=\"check_a\"]
 */
function getNameFromRule (rule) {
  const start = rule.indexOf('"') + 1
  const end = rule.indexOf('"', start + 1)
  return rule.substr(start, (end - start))
}

/**
 * Return the first key of an object, ignoring the Vue.js __ob__ variable.
 * Safari tends to return __ob__ first, while Chrome and FF return it last.
 * @param {Object} obj Object with keys
 */
function getFirstObjectKey (obj) {
  let key = null
  if (obj) {
    const keys = Object.getOwnPropertyNames(obj)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== '__ob__') {
        key = keys[i]
        break
      }
    }
  }
  return key
}

// TODO: At this stage, this "conditional logic" only support limited feature required by submit grant form.
// The only supported is "required" condition state.
// We can add more support when we need here.
// VFG has example for dynamic visibility(same to disabled) https://vue-generators.gitbook.io/vue-generators/fields/field_properties#dynamic-visibility
export default testField
