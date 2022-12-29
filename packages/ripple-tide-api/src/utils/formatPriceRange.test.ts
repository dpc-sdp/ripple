import { expect, describe, it, beforeEach } from '@jest/globals'
import { TidePropRange } from '../../types'

import { formatPriceRange } from './formatPriceRange.js'

describe('Formatting a date range', () => {
  const apiMock: TidePropRange = {
    from: 12000,
    to: 18000
  }

  beforeEach(() => {
    apiMock.from = 12000
    apiMock.to = 18000
  })

  it('formats a price range', () => {
    expect(formatPriceRange(apiMock)).toEqual('$12,000 - $18,000')
  })

  it('formats a single price', () => {
    apiMock.to = apiMock.from
    expect(formatPriceRange(apiMock)).toEqual('$12,000')
  })

  it('converts a string param to a number', () => {
    apiMock.from = '11000'
    expect(formatPriceRange(apiMock)).toEqual('$11,000 - $18,000')
  })

  it('bypasses formatting when "Free entry" is the first prop', () => {
    apiMock.from = 'Free entry'
    expect(formatPriceRange(apiMock)).toEqual('Free entry')
  })

  it('bypasses formatting when both props are 0', () => {
    apiMock.from = 0
    apiMock.to = 0
    expect(formatPriceRange(apiMock)).toEqual('Free entry')
  })

  it('returns null unless both TidePropRange props are valid', () => {
    apiMock.from = 0
    apiMock.to = 'Free entry'
    expect(formatPriceRange(apiMock)).toEqual(null)
  })
})
