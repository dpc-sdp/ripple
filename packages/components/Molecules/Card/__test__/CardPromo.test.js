import { shallowMount } from '@vue/test-utils'
import CardPromo from '../CardPromo'
import moment from 'moment'

describe('CardPromo', () => {
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
          src: 'https://via.placeholder.com/304x199',
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
        displayStyle: 'profile',
        image: {
          src: 'https://via.placeholder.com/304x199',
          focalPoint: {
            x: '152',
            y: '100'
          },
          width: 304,
          height: 199
        }
      }
    })

    expect(wrapper.vm.classModifiers).toEqual('rpl-card-promo--profile')

    wrapper.setProps({ image: null })
    expect(wrapper.vm.classModifiers).toEqual('rpl-card-promo--noimage')

    wrapper.setProps({ displayStyle: 'noImage' })
    expect(wrapper.vm.classModifiers).toEqual('rpl-card-promo--noimage')
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

  it('calculates grant status to open if date today is between grant dates and ongoing is false', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        author: 'John Doe',
        contentType: 'Profile: anything here',
        showMeta: true,
        topic: 'Anything under the sun',
        isGrantOnGoing: '0',
        dateEnd: moment().add(7, 'days'),
        dateStart: moment()
      }
    })

    expect(wrapper.vm.grantStatusData).toEqual(wrapper.vm.statusTerms.open)
  })

  it('calculates grant status to close if date today is past the grant dates and ongoing is false', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        author: 'John Doe',
        contentType: 'Profile: anything here',
        showMeta: true,
        topic: 'Anything under the sun',
        isGrantOnGoing: '0',
        dateEnd: moment().subtract(2, 'days'),
        dateStart: moment().subtract(7, 'days')
      }
    })

    expect(wrapper.vm.grantStatusData).toEqual(wrapper.vm.statusTerms.closed)
  })

  it('calculates grant status to ongoing if ongoing field is true regardless of dates', () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        author: 'John Doe',
        contentType: 'Profile: anything here',
        showMeta: true,
        topic: 'Anything under the sun',
        isGrantOnGoing: '1',
        dateEnd: moment().subtract(2, 'days'),
        dateStart: moment().subtract(7, 'days')
      }
    })

    expect(wrapper.vm.grantStatusData).toEqual(wrapper.vm.statusTerms.ongoing)
  })

  it('formats image so it\'s compatible with responsive-img component', async () => {
    const wrapper = shallowMount(CardPromo, {
      propsData: {
        title: 'Promo card',
        image: {
          src: 'https://via.placeholder.com/304x199',
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
      src: 'https://via.placeholder.com/304x199',
      focalPoint: {
        x: '152',
        y: '100'
      },
      width: 304,
      height: 199
    })

    await wrapper.setProps({ image: 'http://example.com/test.jpg' })
    expect(wrapper.vm.computedImg).toEqual({ src: 'http://example.com/test.jpg' })

    await wrapper.setProps({ image: '' })
    expect(wrapper.vm.computedImg).toEqual('')
  })
})
