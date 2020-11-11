import { shallowMount } from '@vue/test-utils'
import CardNavigationV2 from '../CardNavigationV2'

describe('CardNavigationV2', () => {
  it('returns status icon data properly.', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        title: 'Navigation card V2',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        tag: 'Event',
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

    wrapper.setProps({ status: 'anything' })
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

  it('trimmed Title to expected limit', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        title: 'Navigation card V2 that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
      }
    })

    expect(wrapper.vm.trimmedTitle).toEqual('Navigation card V2 that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla paria...')
    expect(wrapper.vm.trimmedTitle.length).toEqual(150 + 3)
  })

  it('trimmed Summary to expected limit', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu...')
    expect(wrapper.vm.trimmedSummary.length).toEqual(300 + 3)
  })

  it('trimmed Summary to expected limit when there is an image', () => {
    const wrapper = shallowMount(CardNavigationV2, {
      propsData: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...')
    expect(wrapper.vm.trimmedSummary.length).toEqual(200 + 3)
  })
})
