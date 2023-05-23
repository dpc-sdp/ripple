import testField from '../../modules/webform/conditional-logic'

function performTriggerTest (state, trigger, modelValue = '', input = {}) {
  let model = modelValue
  if (typeof modelValue.model === 'undefined') {
    model = {
      model: { 'field_a': modelValue }
    }
  }
  return performTest(state, trigger, model, input)
}

function performTest (state, conditions, model, input = {}) {
  const baseFormField = {
    validator: [],
    required: false,
    disabled: false,
    visible: true,
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

  const data = { ...baseFormData, ...model }
  const field = { ...baseFormField, ...input }
  field.states[state] = conditions
  testField(field, data)
  return { field, data }
}

function testAllStates (trigger, valMatchTrigger, valNotMatchTrigger) {
  expect(performTriggerTest('required', trigger, valMatchTrigger).field).toHaveProperty('required', true)
  expect(performTriggerTest('required', trigger, valNotMatchTrigger).field).toHaveProperty('required', false)
  expect(performTriggerTest('disabled', trigger, valMatchTrigger).field).toHaveProperty('disabled', true)
  expect(performTriggerTest('disabled', trigger, valNotMatchTrigger).field).toHaveProperty('disabled', false)
  expect(performTriggerTest('enabled', trigger, valMatchTrigger).field).toHaveProperty('disabled', false)
  expect(performTriggerTest('enabled', trigger, valNotMatchTrigger).field).toHaveProperty('disabled', true)
  expect(performTriggerTest('visible', trigger, valMatchTrigger).field).toHaveProperty('visible', true)
  expect(performTriggerTest('visible', trigger, valNotMatchTrigger).field).toHaveProperty('visible', false)
  expect(performTriggerTest('invisible', trigger, valMatchTrigger).field).toHaveProperty('visible', false)
  expect(performTriggerTest('invisible', trigger, valNotMatchTrigger).field).toHaveProperty('visible', true)
}

describe('Webform: conditional logic', () => {
  test('Condition is applied if input is empty', async () => {
    const trigger = { ':input[name="field_a"]': { empty: true } }
    const valMatchTrigger = ''
    const valNotMatchTrigger = 'This input is filled.'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is filled', async () => {
    const trigger = { ':input[name="field_a"]': { filled: true } }
    const valMatchTrigger = 'This input is filled.'
    const valNotMatchTrigger = ''

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is checked', async () => {
    const trigger = { ':input[name="field_a"]': { checked: true } }
    const valMatchTrigger = true
    const valNotMatchTrigger = false

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is unchecked', async () => {
    const trigger = { ':input[name="field_a"]': { unchecked: true } }
    const valMatchTrigger = false
    const valNotMatchTrigger = true

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is value', async () => {
    const trigger = { ':input[name="field_a"]': { value: 'test' } }
    const valMatchTrigger = 'test'
    const valNotMatchTrigger = 'failtest'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is pattern', async () => {
    const trigger = { ':input[name="field_a"]': { value: { pattern: '^vic' } } }
    const valMatchTrigger = 'victoria'
    const valNotMatchTrigger = 'melbourne'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is not pattern', async () => {
    const trigger = { ':input[name="field_a"]': { value: { '!pattern': '^mel' } } }
    const valMatchTrigger = 'victoria'
    const valNotMatchTrigger = 'melbourne'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is less than', async () => {
    const trigger = { ':input[name="field_a"]': { value: { less: '10' } } }
    const valMatchTrigger = '9'
    const valNotMatchTrigger = '10'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is greater than', async () => {
    const trigger = { ':input[name="field_a"]': { value: { greater: '10' } } }
    const valMatchTrigger = '11'
    const valNotMatchTrigger = '9'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if input is not value', async () => {
    const trigger = { ':input[name="field_a"]': { '!value': 'melbourne' } }
    const valMatchTrigger = 'victoria'
    const valNotMatchTrigger = 'melbourne'

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if all inputs are checked (AND)', async () => {
    const trigger = {
      ':input[name="field_a"]': { checked: true },
      ':input[name="field_b"]': { checked: true },
      ':input[name="field_c"]': { checked: true }
    }
    const valMatchTrigger = {
      model: {
        field_a: true,
        field_b: true,
        field_c: true
      }
    }
    const valNotMatchTrigger = {
      model: {
        field_a: true,
        field_b: false,
        field_c: true
      }
    }

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if any inputs are checked (OR)', async () => {
    const trigger = [
      { ':input[name="field_a"]': { checked: true } },
      'or',
      { ':input[name="field_b"]': { checked: true } },
      'or',
      { ':input[name="field_c"]': { checked: true } }
    ]
    const valMatchTrigger = {
      model: {
        field_a: false,
        field_b: true,
        field_c: true
      }
    }
    const valNotMatchTrigger = {
      model: {
        field_a: false,
        field_b: false,
        field_c: false
      }
    }

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Condition is applied if 1 input is checked (XOR)', async () => {
    const trigger = [
      { ':input[name="field_a"]': { checked: true } },
      'xor',
      { ':input[name="field_b"]': { checked: true } },
      'xor',
      { ':input[name="field_c"]': { checked: true } }
    ]
    const valMatchTrigger = {
      model: {
        field_a: false,
        field_b: false,
        field_c: true
      }
    }
    const valNotMatchTrigger = {
      model: {
        field_a: false,
        field_b: true,
        field_c: true
      }
    }

    testAllStates(trigger, valMatchTrigger, valNotMatchTrigger)
  })

  test('Field value is cleared when input is hidden and clearHiddenValues is true', async () => {
    const trigger = { ':input[name="field_a"]': { filled: true } }

    const { data, field } = performTriggerTest(
      'invisible', trigger, 'text', { clearHiddenValues: true, isDirty: true, model: 'field_a' }
    )

    expect(field.visible).toBe(false)
    expect(data.model.field_a).toBe(null)
  })

  test('Field value is not cleared when input is hidden and clearHiddenValues is false', async () => {
    const trigger = { ':input[name="field_a"]': { filled: true } }

    const { data, field } = performTriggerTest(
      'invisible', trigger, 'text', { clearHiddenValues: false, model: 'field_a' }
    )

    expect(field.visible).toBe(false)
    expect(data.model.field_a).toBe('text')
  })
})
