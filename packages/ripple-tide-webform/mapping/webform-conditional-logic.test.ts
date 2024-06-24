import { expect, describe, it } from '@jest/globals'
import { getConditionals } from './webform-conditional-logic'

describe('getConditionals', () => {
  describe('states', () => {
    it('required', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        required: '$isChecked($get(input_a).value, "true")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('disabled', () => {
      const input = {
        '#states': {
          disabled: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        disabled: '$isChecked($get(input_a).value, "true")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('enabled', () => {
      const input = {
        '#states': {
          enabled: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        disabled: '$negate($isChecked($get(input_a).value, "true"))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('visible', () => {
      const input = {
        '#states': {
          visible: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        if: '$isChecked($get(input_a).value, "true")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('invisible', () => {
      const input = {
        '#states': {
          invisible: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        if: '$negate($isChecked($get(input_a).value, "true"))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })
  })

  describe('rules', () => {
    it('empty', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              empty: true
            }
          }
        }
      }

      const expected = {
        required: '$negate($isFilled($get(input_a).value))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('filled', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              filled: true
            }
          }
        }
      }

      const expected = {
        required: '$isFilled($get(input_a).value)'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('checked', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        required: '$isChecked($get(input_a).value, "true")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('unchecked', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              unchecked: true
            }
          }
        }
      }

      const expected = {
        required: '$negate($isChecked($get(input_a).value, "true"))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('value', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              value: 'abc'
            }
          }
        }
      }

      const expected = {
        required: '$isEqual($get(input_a).value, "abc")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('!value', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              '!value': 'abc'
            }
          }
        }
      }

      const expected = {
        required: '$negate($isEqual($get(input_a).value, abc))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('pattern', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              value: { pattern: 'abc' }
            }
          }
        }
      }

      const expected = {
        required: '$isPatternMatch($get(input_a).value, "abc")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('!pattern', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              value: { '!pattern': 'abc' }
            }
          }
        }
      }

      const expected = {
        required: '$negate($isPatternMatch($get(input_a).value, "abc"))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('less', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              value: { less: 10 }
            }
          }
        }
      }

      const expected = {
        required: '$difference($get(input_a).value, 10) < 0'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('greater', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              value: { greater: 10 }
            }
          }
        }
      }

      const expected = {
        required: '$difference($get(input_a).value, 10) > 0'
      }

      expect(getConditionals(input)).toEqual(expected)
    })
  })

  describe('rule combinations', () => {
    it('AND', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a"]': {
              checked: true
            },
            ':input[name="input_b"]': {
              value: 'abc'
            }
          }
        }
      }

      const expected = {
        required:
          '$isChecked($get(input_a).value, "true") && $isEqual($get(input_b).value, "abc")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('OR', () => {
      const input = {
        '#states': {
          required: [
            {
              ':input[name="input_a"]': {
                checked: true
              }
            },
            'or',
            {
              ':input[name="input_b"]': {
                value: 'abc'
              }
            }
          ]
        }
      }

      const expected = {
        required:
          '$isChecked($get(input_a).value, "true") || $isEqual($get(input_b).value, "abc")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('XOR', () => {
      const input = {
        '#states': {
          required: [
            {
              ':input[name="input_a"]': {
                checked: true
              }
            },
            'xor',
            {
              ':input[name="input_b"]': {
                value: 'abc'
              }
            }
          ]
        }
      }

      const expected = {
        required:
          '$xor($isChecked($get(input_a).value, "true"), $isEqual($get(input_b).value, "abc"))'
      }

      expect(getConditionals(input)).toEqual(expected)
    })
  })

  describe('array selectors', () => {
    it('checked', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a[option_one]"]': {
              checked: true
            }
          }
        }
      }

      const expected = {
        required: '$isChecked($get(input_a).value, "option_one")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })

    it('value', () => {
      const input = {
        '#states': {
          required: {
            ':input[name="input_a[]"]': {
              value: 'option_one'
            }
          }
        }
      }

      const expected = {
        required: '$isEqual($get(input_a).value, "option_one")'
      }

      expect(getConditionals(input)).toEqual(expected)
    })
  })

  it('prefixes inputs', () => {
    const input = {
      formId: 'test_id',
      '#states': {
        required: {
          ':input[name="input_a"]': {
            checked: true
          }
        }
      }
    }

    const expected = {
      required: '$isChecked($get(test_id_input_a).value, "true")'
    }

    expect(getConditionals(input)).toEqual(expected)
  })
})
