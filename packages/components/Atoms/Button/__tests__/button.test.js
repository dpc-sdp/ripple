import { mount } from '@vue/test-utils'
import RplButton from './../index'

describe('RplButton', () => {
  it('render the correct class for the primary theme', () => {
    const wrapper = mount(RplButton, {
      propsData: {
        theme: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('rpl-button--primary')
    expect(wrapper.classes()).not.toContain('rpl-button--secondary')
  })

  it('should not render any custom classes if there is no theme provided', () => {
    const wrapper = mount(RplButton, {
      propsData: {}
    })
    expect(wrapper.classes()).toEqual(
      expect.not.arrayContaining(['rpl-button--primary', 'rpl-button--secondary', 'rpl-button--disabled'])
    )
  })

  it('renders button disabled class when disabled flag is true', () => {
    const wrapper = mount(RplButton, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('rpl-button--disabled')
    expect(wrapper.classes()).not.toContain('rpl-button--primary')
    expect(wrapper.classes()).not.toContain('rpl-button--secondary')
  })
})
