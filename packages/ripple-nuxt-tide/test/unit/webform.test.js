import testField from '../../modules/webform/conditional-logic'

const baseField = {
  validator: [],
  required: false,
  states: {}
}

const baseFormData = {
  model: {
    field_a: null,
    field_b: null,
    field_c: null,
    actions: null
  }
}

function performTriggerTest (state, trigger, modelValue, resultStateProperty) {
  performTest(state, { ':input[name="field_a"]': trigger }, { model: { 'field_a': modelValue } }, resultStateProperty)
}

function performTest (state, conditions, model, resultStateProperty) {
  const field = { ...baseField }
  const data = { ...baseFormData, ...model }
  field.states[state] = conditions
  testField(field, data)
  expect(field).toHaveProperty(state, resultStateProperty)
}

describe('Webform: conditional logic', () => {
  test('Field is required if input is empty', async () => {
    performTriggerTest('required', { empty: true }, '', true) // Pass
    performTriggerTest('required', { empty: true }, 'failtest', false) // Fail
  })

  test('Field is required if input is filled', async () => {
    performTriggerTest('required', { filled: true }, 'test', true) // Pass
    performTriggerTest('required', { filled: true }, '', false) // Fail
  })

  test('Field is required if input is checked', async () => {
    performTriggerTest('required', { checked: true }, true, true) // Pass
    performTriggerTest('required', { checked: true }, false, false) // Fail
  })

  test('Field is required if input is unchecked', async () => {
    performTriggerTest('required', { unchecked: true }, false, true) // Pass
    performTriggerTest('required', { unchecked: true }, true, false) // Fail
  })

  test('Field is required if input is value', async () => {
    performTriggerTest('required', { value: 'test' }, 'test', true) // Pass
    performTriggerTest('required', { value: 'test' }, 'failtest', false) // Fail
  })

  test('Field is required if input is pattern', async () => {
    performTriggerTest('required', { value: { pattern: '^vic' } }, 'victoria', true) // Pass
    performTriggerTest('required', { value: { pattern: '^vic' } }, 'melbourne', false) // Fail
  })

  test('Field is required if input is not pattern', async () => {
    performTriggerTest('required', { value: { '!pattern': '^mel' } }, 'victoria', true) // Pass
    performTriggerTest('required', { value: { '!pattern': '^mel' } }, 'melbourne', false) // Fail
  })

  test('Field is required if input is less than', async () => {
    performTriggerTest('required', { value: { less: '10' } }, '9', true) // Pass
    performTriggerTest('required', { value: { less: '10' } }, '10', false) // Fail
  })

  test('Field is required if input is greater than', async () => {
    performTriggerTest('required', { value: { greater: '10' } }, '11', true) // Pass
    performTriggerTest('required', { value: { greater: '10' } }, '9', false) // Fail
  })

  test('Field is required if input is not value', async () => {
    performTriggerTest('required', { '!value': 'melbourne' }, 'victoria', true) // Pass
    performTriggerTest('required', { '!value': 'melbourne' }, 'melbourne', false) // Fail
  })

  test('Field is required if all inputs are checked (AND)', async () => {
    // Pass
    performTest('required', {
      ':input[name="field_a"]': { checked: true },
      ':input[name="field_b"]': { checked: true },
      ':input[name="field_c"]': { checked: true }
    }, {
      model: {
        field_a: true,
        field_b: true,
        field_c: true
      }
    }, true)
    // Fail
    performTest('required', {
      ':input[name="field_a"]': { checked: true },
      ':input[name="field_b"]': { checked: true },
      ':input[name="field_c"]': { checked: true }
    }, {
      model: {
        field_a: true,
        field_b: false,
        field_c: true
      }
    }, false)
  })

  test('Field is required if any inputs are checked (OR)', async () => {
    // Pass
    performTest('required', [
      { ':input[name="field_a"]': { checked: true } },
      'or',
      { ':input[name="field_b"]': { checked: true } },
      'or',
      { ':input[name="field_c"]': { checked: true } }
    ], {
      model: {
        field_a: false,
        field_b: true,
        field_c: true
      }
    }, true)
    // Fail
    performTest('required', [
      { ':input[name="field_a"]': { checked: true } },
      'or',
      { ':input[name="field_b"]': { checked: true } },
      'or',
      { ':input[name="field_c"]': { checked: true } }
    ], {
      model: {
        field_a: false,
        field_b: false,
        field_c: false
      }
    }, false)
  })

  test('Field is required if 1 input is checked (XOR)', async () => {
    // Pass
    performTest('required', [
      { ':input[name="field_a"]': { checked: true } },
      'xor',
      { ':input[name="field_b"]': { checked: true } },
      'xor',
      { ':input[name="field_c"]': { checked: true } }
    ], {
      model: {
        field_a: false,
        field_b: false,
        field_c: true
      }
    }, true)
    // Fail
    performTest('required', [
      { ':input[name="field_a"]': { checked: true } },
      'xor',
      { ':input[name="field_b"]': { checked: true } },
      'xor',
      { ':input[name="field_c"]': { checked: true } }
    ], {
      model: {
        field_a: false,
        field_b: true,
        field_c: true
      }
    }, false)
  })
})
