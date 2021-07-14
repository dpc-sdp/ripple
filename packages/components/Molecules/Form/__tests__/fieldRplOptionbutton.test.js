import { mount } from '@vue/test-utils'
import RplOptionButton from './../fields/fieldRploptionbutton'

describe('RplOptionButton', () => {
  it('has A-Z for default options', () => {
    const wrapper = mount(RplOptionButton, {
      propsData: {
        schema: {
          type: 'rploptionbutton',
          label: 'Option button default',
          hint: 'Option button test',
          model: 'optionsButton'
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    wrapper.findAll('.rpl-option-button__label').wrappers.forEach((item, idx) => {
      expect(item.text()).toBe(alphabet[idx])
    })
  })

  it('sets the value "D" when 4th option clicked', () => {
    const wrapper = mount(RplOptionButton, {
      propsData: {
        model: {
          optionsButton: null
        },
        schema: {
          type: 'rploptionbutton',
          label: 'Option button default',
          hint: 'Option button test',
          model: 'optionsButton'
        }
      }
    })
    wrapper.find('.rpl-option-button__label:nth-child(4)').trigger('click')
    expect(wrapper.props().model.optionsButton).toBe('D')
  })

  it('has custom text for options when defined', () => {
    const customOptions = [
      'Option one',
      'Option two',
      'Option three'
    ]
    const wrapper = mount(RplOptionButton, {
      propsData: {
        model: {
          optionsButton: null
        },
        schema: {
          type: 'rploptionbutton',
          label: 'Option button default',
          hint: 'Option button test',
          model: 'optionsButton',
          optionValues: customOptions
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    wrapper.findAll('.rpl-option-button__label').wrappers.forEach((item, idx) => {
      expect(item.text()).toBe(customOptions[idx])
    })
  })

  it('sets the value "Option three" when 3rd option clicked', () => {
    const wrapper = mount(RplOptionButton, {
      propsData: {
        model: {
          optionsButton: null
        },
        schema: {
          type: 'rploptionbutton',
          label: 'Option button default',
          hint: 'Option button test',
          model: 'optionsButton',
          optionValues: [
            'Option one',
            'Option two',
            'Option three'
          ]
        }
      }
    })
    wrapper.find('.rpl-option-button__label:nth-child(3)').trigger('click')
    expect(wrapper.props().model.optionsButton).toBe('Option three')
  })
})
