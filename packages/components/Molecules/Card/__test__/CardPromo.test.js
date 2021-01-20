import { shallowMount } from '@vue/test-utils'
import CardPromo from '../CardPromo'

describe('CardPromo', () => {
  it('returns status icon data properly.', async () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        topic: 'ARTS, CULTURE AND HERITAGE',
        author: 'John Doe',
        status: 'closed'
      }
    })

    expect(wrapper.vm.statusIcon).toEqual({
      symbol: 'cross_circle',
      color: 'danger'
    })

    await wrapper.setProps({ status: 'open' })
    expect(wrapper.vm.statusIcon).toEqual({
      symbol: 'success',
      color: 'success'
    })

    await wrapper.setProps({ status: 'anything' })
    expect(wrapper.vm.statusIcon).toEqual({
      symbol: 'success',
      color: 'success'
    })

    await wrapper.setProps({ status: '' })
    expect(wrapper.vm.statusIcon).toBeUndefined()
  })

  it('trimmed Summary to hard limit 300', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        link: { text: 'Read more', url: '#' }
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(300 + 3)
  })

  it('trimmed Summary to expected limit when display style is profile', () => {
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
        link: { text: 'Read more', url: '#' },
        displayStyle: 'profile'
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(150 + 3)
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
        topic: 'Event',
        author: 'John Doe',
        status: 'closed',
        displayStyle: 'profile'
      }
    })

    expect(wrapper.vm.modifiers).toEqual(['rpl-card-promo--profile'])

    wrapper.setProps({ displayStyle: 'noImage' })
    expect(wrapper.vm.modifiers).toEqual(['rpl-card-promo--noimage'])
  })

  it('returns content type label when it is valid and showMeta is true', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        author: 'John Doe',
        contentType: 'Profile: Women\'s Honour Roll',
        showMeta: true,
        topic: 'Anything under the sun'
      }
    })

    expect(wrapper.vm.contentTypeLabel).toEqual('Profile')

    wrapper.setProps({ contentType: '' })
    expect(wrapper.vm.contentTypeLabel).toEqual('')
  })

  it('returns topic label when content type is not valid and showMeta flag is true', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        author: 'John Doe',
        contentType: 'Profile: anything here',
        showMeta: true,
        topic: 'Anything under the sun'
      }
    })

    expect(wrapper.vm.topicLabel).toEqual('Anything under the sun')

    wrapper.setProps({ topic: '' })
    expect(wrapper.vm.topicLabel).toEqual('')
  })
})
