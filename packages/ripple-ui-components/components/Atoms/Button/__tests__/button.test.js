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
  })
})
