import { expect, describe, it } from 'vitest'
import getGrantStatus from './getGrantStatus.js'

describe('getGrantStatus', () => {
  it('displays status as "Closed" when current date is after start date and after end date', () => {
    const now = new Date('2019-04-13T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-10T06:19:17+00:00'
    const dateEnd = '2019-04-12T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'closed',
      displayLabel: 'Closed'
    })
  })

  it('displays status as "Closed" when current date is after end date and there is no start date', () => {
    const now = new Date('2019-04-13T06:19:17+00:00')
    const ongoing = false
    const dateStart = ''
    const dateEnd = '2019-04-12T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'closed',
      displayLabel: 'Closed'
    })
  })

  it('displays status as "Opens <startdate>" when startdate is tommorrow', () => {
    const now = new Date('2019-03-11T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-03-12T06:19:17+00:00'
    const dateEnd = '2019-05-10T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'opening_soon',
      displayLabel: 'Opens 12 March 2019'
    })
  })

  it('displays status as "Opens <startdate>" when startdate further in the future', () => {
    const now = new Date('2019-03-11T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-10T06:19:17+00:00'
    const dateEnd = '2019-05-10T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'opening_soon',
      displayLabel: 'Opens 10 April 2019'
    })
  })

  it('displays status as "Open, closes <enddate>" when current date is after start date and before end date', () => {
    const now = new Date('2019-04-11T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-09T06:19:17+00:00'
    const dateEnd = '2019-05-10T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Open, closes 10 May 2019'
    })
  })

  it('displays status as "Open, closes <enddate>" when current date is after start date and 1 day from end date', () => {
    const now = new Date('2019-04-11T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-10T06:19:17+00:00'
    const dateEnd = '2019-04-12T06:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Open, closes 12 April 2019'
    })
  })

  it('displays status as "Open, closes today" when current date is after start date and the same as end date', () => {
    const now = new Date('2019-04-12T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-10T06:19:17+00:00'
    const dateEnd = '2019-04-12T07:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Open, closes today'
    })
  })

  it('displays status as "Ongoing" if the ongoing flag is set to true', () => {
    const now = new Date('2019-04-12T06:19:17+00:00')
    const ongoing = true
    const dateStart = '2019-04-10T06:19:17+00:00'
    const dateEnd = '2019-04-12T07:19:17+00:00'

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Ongoing'
    })
  })

  it('displays status as "Ongoing" if there is no end date and the current date is after the start date', () => {
    const now = new Date('2019-04-12T06:19:17+00:00')
    const ongoing = false
    const dateStart = '2019-04-11T06:19:17+00:00'
    const dateEnd = ''

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Ongoing'
    })
  })

  it('displays status as "Ongoing" if there is no start or end date', () => {
    const now = new Date('2019-04-12T06:19:17+00:00')
    const ongoing = false
    const dateStart = ''
    const dateEnd = ''

    const result = getGrantStatus(now, ongoing, dateStart, dateEnd)

    expect(result).toEqual({
      status: 'open',
      displayLabel: 'Ongoing'
    })
  })
})
