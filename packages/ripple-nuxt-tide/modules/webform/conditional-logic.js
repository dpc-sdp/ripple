function testRule (rules, data) {
  let operator = ''
  let results = []

  // Build up a results array.
  rules.forEach(item => {
    if (typeof item === 'object') {
      // Get properties
      const key = getFirstObjectKey(item)
      const model = getNameFromRule(key)
      const prop = getFirstObjectKey(item[key])
      const value = item[key][prop]
      // get model value
      const modelValue = getModelValue(model, data)
      let result = true
      // Test for empty
      if (prop === 'empty') {
        if (value === true) {
          // true if empty
          result = (modelValue == null || modelValue === '')
        } else {
          // true if not empty
          result = (modelValue != null || modelValue !== '')
        }
      }
      results.push(result)
    } else {
      // Expect the operator.
      operator = item
    }
  })

  if (operator === 'or') {
    // If any of these is true, return true
    for (let i = 0; i < results.length; i++) {
      if (results[i] === true) {
        return true
      }
    }
  }
  return false
}

function getNameFromRule (rule) {
  const start = rule.indexOf('"') + 1
  const end = rule.indexOf('"', start + 1)
  return rule.substr(start, (end - start))
}

function getModelValue (model, data) {
  return data.model[model]
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
export default function (field, rule, data) {
  for (const state in rule) {
    if (state === 'required') {
      const testPassed = testRule(rule[state], data)
      field.required = testPassed
      // Remove 'required' from validator array.
      const idxRequired = field.validator.indexOf('required')
      if (testPassed && idxRequired < 0) {
        field.validator.push('required')
      } else if (!testPassed && idxRequired >= 0) {
        field.validator.splice(idxRequired, 1)
      }
    }
  }
}
