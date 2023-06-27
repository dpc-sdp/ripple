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

  it('formats a price range starting with 0', () => {
    apiMock.from = 0
    expect(formatPriceRange(apiMock)).toEqual('$0 - $18,000')
  })

  it('formats a single price when two values are the same', () => {
    apiMock.to = apiMock.from
    expect(formatPriceRange(apiMock)).toEqual('$12,000')
  })

  it('converts a string param to a number', () => {
    apiMock.from = '11000'
    expect(formatPriceRange(apiMock)).toEqual('$11,000 - $18,000')
  })

  it('displays the from text and formatted to price', () => {
    apiMock.from = 'FREE'
    expect(formatPriceRange(apiMock)).toEqual('FREE - $18,000')
  })

  it('displays the from and to text', () => {
    apiMock.from = 'FREE'
    apiMock.to = 'Donation'
    expect(formatPriceRange(apiMock)).toEqual('FREE - Donation')
  })

  it('displays only the from text when to value is falsey', () => {
    apiMock.from = 'FREE'
    apiMock.to = '0'
    expect(formatPriceRange(apiMock)).toEqual('FREE')
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

  it('returns null when from is 0 and to is not set', () => {
    apiMock.from = 0
    apiMock.to = ''
    expect(formatPriceRange(apiMock)).toEqual(null)
  })
})
