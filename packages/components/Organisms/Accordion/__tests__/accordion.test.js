import { shallowMount } from '@vue/test-utils'
import RplAccordion from '../Accordion'

describe('RplAccordion', () => {
  it('opens all items when items are not all collapsed', async () => {
    const wrapper = shallowMount(RplAccordion, {
      propsData: {
        accordions: [
          {
            'title': 'Accordion Item',
            'content': '<p>Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.</p>'
          },
          {
            'title': 'Accordion Item',
            'content': '<p>Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.</p>'
          }
        ]
      }
    })

    expect(wrapper.vm.closeOpenLabel).toEqual('Open all')
    expect(wrapper.vm.isCollapsed).toEqual(false)

    await wrapper.find('.rpl-accordion__collapse-btn').trigger('click') // click Open all link
    expect(wrapper.vm.closeOpenLabel).toEqual('Close all')
    expect(wrapper.vm.isCollapsed).toEqual(true)

    await wrapper.find('.rpl-accordion__collapse-btn').trigger('click') // click Close all link
    expect(wrapper.vm.closeOpenLabel).toEqual('Open all')
    expect(wrapper.vm.isCollapsed).toEqual(false)

    await wrapper.vm.accordionClick(0) // expand first item
    expect(wrapper.vm.closeOpenLabel).toEqual('Open all')
    expect(wrapper.vm.isCollapsed).toEqual(false)

    await wrapper.vm.accordionClick(1) // expand second item
    expect(wrapper.vm.closeOpenLabel).toEqual('Close all')
    expect(wrapper.vm.isCollapsed).toEqual(true)
  })
})
