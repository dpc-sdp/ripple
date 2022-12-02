import { expect, describe, it, beforeEach } from '@jest/globals'
import { TidePropRange } from '../../types'

import { formatDateRange } from './formatDateRange.js'

describe('Formatting a date range', () => {
  let showTime: boolean
  const apiMock: TidePropRange = {
    from: '2019-07-02T09:00:00+1000',
    to: '2019-07-07T10:00:00+1000'
  }

  beforeEach(() => {
    apiMock.from = '2019-07-02T09:00:00+1000'
    apiMock.to = '2019-07-07T10:00:00+1000'
    showTime = false
  })

  it('formats a date range without time', () => {
    expect(formatDateRange(apiMock, showTime)).toEqual(
      '02 July 2019 - 07 July 2019'
    )
  })

  it('formats a date range with time', () => {
    showTime = true
    expect(formatDateRange(apiMock, showTime)).toEqual(
      '02 July 2019 at 9:00 am - 07 July 2019 at 10:00 am'
    )
  })

  it('formats a single date without time', () => {
    apiMock.to = apiMock.from
    expect(formatDateRange(apiMock, showTime)).toEqual('02 July 2019')
  })

  it('formats a single date with time', () => {
    apiMock.to = apiMock.from
    showTime = true
    expect(formatDateRange(apiMock, showTime)).toEqual(
      '02 July 2019 at 9:00 am'
    )
  })

  it('returns null unless both TidePropRange props are valid', () => {
    expect(formatDateRange({ from: apiMock.from, to: 0 })).toEqual(null)
  })
})
