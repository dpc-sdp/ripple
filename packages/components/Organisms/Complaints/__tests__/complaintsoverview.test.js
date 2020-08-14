import { mount } from '@vue/test-utils'
import { RplComplaintsOverview } from './../index'
const MockDate = require('mockdate')

describe('RplComplaintsOverview', () => {
  const defaultProps = {
    title: '',
    funding: {
      from: '',
      to: ''
    },
    audience: '',
    startdate: '',
    enddate: '',
    description: '',
    link: {
      url: '',
      text: ''
    },
    listing: false
  }
  afterEach(() => {
    MockDate.reset()
  })

  it('displays status as "closed" when current date is after start date and after end date', () => {
    MockDate.set('2019-04-13T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-10T06:19:17+00:00',
        enddate: '2019-04-12T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Closed')
  })

  it('displays status as "closed" when current date is after end date and there is no start date', () => {
    MockDate.set('2019-04-13T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '',
        enddate: '2019-04-12T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Closed')
  })

  it('displays status as "Opening on startdate" when current date is within one month of startdate', () => {
    MockDate.set('2019-03-11T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-10T06:19:17+00:00',
        enddate: '2019-05-10T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Opening on 10 April')
  })

  it('displays status as "Closed" when current date is more than one month of startdate', () => {
    MockDate.set('2019-01-10T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-02-10T06:19:17+00:00',
        enddate: '2019-05-10T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Closed')
  })

  it('displays status as "Open, closing in x days" when current date is more start date and less than end date', () => {
    MockDate.set('2019-04-11T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-09T06:19:17+00:00',
        enddate: '2019-05-10T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Open, closing in 29 days')
  })

  it('displays status as "Open, closing in 1 day" when current date is after start date and 1 day from end date', () => {
    MockDate.set('2019-04-11T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-10T06:19:17+00:00',
        enddate: '2019-04-12T06:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Open, closing in 1 day')
  })

  it('displays status as "Open, closes today" when current date is after start date and the same as end date', () => {
    MockDate.set('2019-04-12T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-10T06:19:17+00:00',
        enddate: '2019-04-12T07:19:17+00:00'
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Open, closing today')
  })

  it('displays status as "Ongoing" if there is no end date and the current date is after the start date', () => {
    MockDate.set('2019-04-12T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '2019-04-11T06:19:17+00:00',
        enddate: ''
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Ongoing')
  })

  it('displays status as "Ongoing" if there is no start or end date', () => {
    MockDate.set('2019-04-12T06:19:17+00:00')

    const wrapper = mount(RplComplaintsOverview, {
      propsData: {
        ...defaultProps,
        startdate: '',
        enddate: ''
      }
    })
    expect(wrapper.find('[data-tid="complaints-status"]').text()).toEqual('Ongoing')
  })
})
