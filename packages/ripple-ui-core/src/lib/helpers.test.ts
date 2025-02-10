import { expect, describe, it } from 'vitest'

import { formatDate, distanceAsPercentage } from './helpers.js'

describe('Formatting a date', () => {
  const raw = '2024-08-02T09:00:00+1000'

  it('formats a date', () => {
    expect(formatDate(raw)).toEqual('2 Aug 2024')
  })

  it('accepts custom date options', () => {
    expect(
      formatDate(raw, { day: 'numeric', month: 'short', year: '2-digit' })
    ).toEqual('2 Aug 24')
  })

  it('accepts custom date options with a non-default tz', () => {
    expect(
      formatDate(raw, {
        dateStyle: 'medium',
        timeZone: 'Japan',
        timeStyle: 'short'
      })
    ).toEqual('2 Aug 2024, 8:00 am')
  })
})

describe('Transform distance to percentage', () => {
  it('transforms a simple 100-scale', () => {
    expect(distanceAsPercentage(35, 100)).toEqual(35)
  })

  it('transforms a point above ceil', () => {
    expect(distanceAsPercentage(110, 100)).toEqual(100)
  })

  it('transforms a point below floor', () => {
    expect(distanceAsPercentage(-80, 100)).toEqual(0)
  })

  it('transforms a complex scale', () => {
    expect(distanceAsPercentage(29, 76)).toEqual(38.16)
  })
})
