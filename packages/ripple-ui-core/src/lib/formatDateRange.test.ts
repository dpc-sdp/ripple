import { expect, describe, it, beforeEach } from 'vitest'
import { RplDateRange } from './constants.js'

import { formatDateRange } from './formatDateRange.js'

describe('Formatting a date range', () => {
  let showTime: boolean
  let formatOpts: any
  const apiMock: RplDateRange = {
    from: '2024-08-02T09:00:00+1000',
    to: '2024-08-07T10:00:00+1000'
  }

  beforeEach(() => {
    apiMock.from = '2024-08-02T09:00:00+1000'
    apiMock.to = '2024-08-07T10:00:00+1000'
    showTime = false
    formatOpts = {}
  })

  it('formats a date range without time', () => {
    expect(formatDateRange(apiMock, formatOpts, showTime)).toEqual(
      '2 August to 7 August 2024'
    )
  })

  it('formats a date range with time', () => {
    showTime = true
    expect(formatDateRange(apiMock, formatOpts, showTime)).toEqual(
      '2 August 2024 9:00 am to 7 August 2024 10:00 am'
    )
  })

  it('formats a single date without time', () => {
    apiMock.to = apiMock.from
    expect(formatDateRange(apiMock)).toEqual('2 August 2024')
  })

  it('formats a single date without time even when the end time is different', () => {
    apiMock.to = '2024-08-02T11:00:00+1300'
    apiMock.to = apiMock.from
    expect(formatDateRange(apiMock, formatOpts, showTime)).toEqual(
      '2 August 2024'
    )
  })

  it('formats a single date with time', () => {
    apiMock.to = apiMock.from
    showTime = true
    expect(formatDateRange(apiMock, formatOpts, showTime)).toEqual(
      '2 August 2024 9:00 am'
    )
  })

  it('formats a single date with different end time', () => {
    apiMock.to = '2024-08-02T11:00:00+1000'
    showTime = true
    expect(formatDateRange(apiMock, formatOpts, showTime)).toEqual(
      '2 August 2024 9:00 am to 11:00 am'
    )
  })

  it('formats a date range with custom date options', () => {
    formatOpts = { month: 'short' }
    expect(formatDateRange(apiMock, formatOpts)).toEqual('2 Aug to 7 Aug 2024')
  })

  it('returns null unless both RplDateRange props are valid', () => {
    expect(formatDateRange({ from: apiMock.from, to: 0 })).toEqual(null)
  })
})
