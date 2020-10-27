import { shallowMount } from '@vue/test-utils'
import CardNavigationV2 from '../CardNavigationV2'

describe('CardNavigationV2', () => {
  it('returns status icon data properly.', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        title: 'Navigation card V2',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        tag: 'Grant',
        author: 'John Doe',
        status: 'closed'
      }
    })

    expect(wrapper.vm.statusIcon).toEqual({
      symbol: 'cross_circle',
      color: 'danger'
    })

    wrapper.setProps({ status: 'open' })
    expect(wrapper.vm.statusIcon).toEqual({
      symbol: 'success',
      color: 'success'
    })

    wrapper.setProps({ status: '' })
    expect(wrapper.vm.statusIcon).toBeUndefined()
  })

  it('returns correct image format.', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        title: 'Navigation card V2',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: {
          src: 'https://placehold.it/304x199',
          focalPoint: {
            x: '152',
            y: '100'
          },
          width: 304,
          height: 199
        }
      }
    })

    expect(wrapper.vm.computedImg).toEqual({
      src: 'https://placehold.it/304x199',
      focalPoint: {
        x: '152',
        y: '100'
      },
      width: 304,
      height: 199
    })

    wrapper.setProps({ image: 'https://placehold.it/304x199' })
    expect(wrapper.vm.computedImg).toEqual({
      src: 'https://placehold.it/304x199'
    })
  })
})
