import { expect, describe, it } from 'vitest'
import { epochToDate } from './epochToDate.js'

describe('epochToDate(epoch)', () => {
  it('returns a date object', () => {
    expect(epochToDate('1609459200')).toEqual('1 Jan 2021')
  })

  it('returns null if param is invalid', () => {
    expect(epochToDate('invalid')).toEqual(null)
  })
})
