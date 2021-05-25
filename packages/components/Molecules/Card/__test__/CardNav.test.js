import { shallowMount } from '@vue/test-utils'
import CardNav from '../CardNav'
import moment from 'moment'

describe('CardNav', () => {
  it('trimmed Title to expected limit', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Navigation card V2 that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident'
      }
    })

    expect(wrapper.vm.trimmedTitle).toEqual('Navigation card V2 that is more than 150 characters Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla paria...')
    expect(wrapper.vm.trimmedTitle).toHaveLength(150 + 3)
  })

  it('trimmed Summary to expected limit', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(300 + 3)
  })

  it('trimmed Summary to expected limit when there is an image', () => {
    const wrapper = shallowMount(CardNav, {
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
        }
      }
    })

    expect(wrapper.vm.trimmedSummary).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...')
    expect(wrapper.vm.trimmedSummary).toHaveLength(200 + 3)
  })

  it('formats the date correctly', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Navigation card V2',
        dateStart: '2020-11-10T23:45:00',
        dateEnd: '2020-11-11T00:15:00'
      }
    })

    expect(wrapper.vm.formattedDate).toEqual('10 to 11 November')

    wrapper.setProps({ dateEnd: null })
    expect(wrapper.vm.formattedDate).toEqual('10 November 2020')
  })

  it('generates css modifiers based on display style props value', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        topic: 'Event',
        authors: ['John Doe'],
        displayStyle: 'featured'
      }
    })

    expect(wrapper.vm.classModifiers).toEqual('rpl-card-nav--featured')

    wrapper.setProps({ displayStyle: 'noImage' })
    expect(wrapper.vm.classModifiers).toEqual('rpl-card-nav--noimage')
  })

  it('returns content type label when it has valid value and showMeta flag is true', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        authors: ['John Doe'],
        contentType: 'Profile: Women\'s Honour Roll',
        showMeta: true,
        topic: 'Anything under the sun'
      }
    })

    expect(wrapper.vm.contentTypeLabel).toEqual('Profile')

    wrapper.setProps({ contentType: null })
    expect(wrapper.vm.contentTypeLabel).toEqual('')
  })

  it('returns topic label when it has value and showMeta flag is true', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        authors: ['John Doe'],
        contentType: 'Profile: invalid content type',
        showMeta: true,
        topic: 'Anything under the sun'
      }
    })

    expect(wrapper.vm.topicLabel).toEqual('Anything under the sun')

    wrapper.setProps({ topic: null })
    expect(wrapper.vm.topicLabel).toEqual('')
  })

  it('calculates grant status to open if date today is between grant dates and ongoing is false', () => {
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        authors: ['John Doe'],
        contentType: 'Profile: invalid content type',
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
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        authors: ['John Doe'],
        contentType: 'Profile: invalid content type',
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
    const wrapper = shallowMount(CardNav, {
      propsData: {
        title: 'Nav card',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Read more', url: '#' },
        authors: ['John Doe'],
        contentType: 'Profile: invalid content type',
        showMeta: true,
        topic: 'Anything under the sun',
        isGrantOnGoing: '1',
        dateEnd: moment().subtract(2, 'days'),
        dateStart: moment().subtract(7, 'days')

      }
    })

    expect(wrapper.vm.grantStatusData).toEqual(wrapper.vm.statusTerms.ongoing)
  })
})
