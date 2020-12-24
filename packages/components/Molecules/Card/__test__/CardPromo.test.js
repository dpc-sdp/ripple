import { shallowMount } from '@vue/test-utils'
import CardPromo from '../CardPromo'

describe('CardPromo', () => {
  it('returns status icon data properly.', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
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

  it('trimmed Title to expected limit', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
        link: { text: 'Read more', url: '#' }
      }
    })

    expect(wrapper.vm.trimmedTitle).toEqual('Promo card that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exc...')
    expect(wrapper.vm.trimmedTitle).toHaveLength(150 + 3)
  })

  it('trimmed Summary to expected limit', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        link: { text: 'Read more', url: '#' }
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(300 + 3)
  })

  it('trimmed Summary to expected limit when there is an image', () => {
    const wrapper = shallowMount(CardPromo, {
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
        },
        link: { text: 'Read more', url: '#' }
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(200 + 3)
  })

  it('formats the date correctly', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        dateStart: '2020-11-10T23:45:00',
        dateEnd: '2020-11-11T00:15:00',
        link: { text: 'Read more', url: '#' }
      }
    })

    expect(wrapper.vm.formattedDate).toEqual('10 to 11 November')

    wrapper.setProps({ dateEnd: null })
    expect(wrapper.vm.formattedDate).toEqual('10 November 2020')
  })

  it('generates css modifiers based on display style props value', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        tag: 'Event',
        author: 'John Doe',
        status: 'closed',
        displayStyle: 'profile'
      }
    })

    expect(wrapper.vm.modifiers).toEqual(['rpl-card-promo--profile'])

    wrapper.setProps({ displayStyle: 'noImage' })
    expect(wrapper.vm.modifiers).toEqual(['rpl-card-promo--noimage'])
  })
})
