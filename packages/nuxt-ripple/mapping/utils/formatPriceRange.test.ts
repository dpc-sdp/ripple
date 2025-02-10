import { expect, describe, it, beforeEach } from 'vitest'

import formatPriceRange from './formatPriceRange.js'

interface Args {
  from: number | string
  to: number | string
}

describe('Formatting a date range', () => {
  const args: Args = {
    from: 12000,
    to: 18000
  }

  beforeEach(() => {
    args.from = 12000
    args.to = 18000
  })

  it('formats a price range', () => {
    expect(formatPriceRange(args.from, args.to)).toEqual('$12,000 - $18,000')
  })

  it('formats a price range starting with 0', () => {
    args.from = 0
    expect(formatPriceRange(args.from, args.to)).toEqual('$0 - $18,000')
  })

  it('formats a single price when two values are the same', () => {
    args.to = args.from
    expect(formatPriceRange(args.from, args.to)).toEqual('$12,000')
  })

  it('converts a string param to a number', () => {
    args.from = '11000'
    expect(formatPriceRange(args.from, args.to)).toEqual('$11,000 - $18,000')
  })

  it('displays the from text and formatted to price', () => {
    args.from = 'FREE'
    expect(formatPriceRange(args.from, args.to)).toEqual('FREE - $18,000')
  })

  it('displays the from and to text', () => {
    args.from = 'FREE'
    args.to = 'Donation'
    expect(formatPriceRange(args.from, args.to)).toEqual('FREE - Donation')
  })

  it('displays only the from text when to value is falsey', () => {
    args.from = 'FREE'
    args.to = '0'
    expect(formatPriceRange(args.from, args.to)).toEqual('FREE')
  })

  it('bypasses formatting when both props are 0', () => {
    args.from = 0
    args.to = 0
    expect(formatPriceRange(args.from, args.to)).toEqual('Free entry')
  })

  it('returns null unless both TidePropRange props are valid', () => {
    args.from = 0
    args.to = 'Free entry'
    expect(formatPriceRange(args.from, args.to)).toEqual(null)
  })

  it('returns null when from is 0 and to is not set', () => {
    args.from = 0
    args.to = ''
    expect(formatPriceRange(args.from, args.to)).toEqual(null)
  })
})
