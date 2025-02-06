import { expect, describe, it } from 'vitest'
import TideApiError from './../api-error'

describe('TideApiError', () => {
  it('should return correct status', () => {
    const tideApiError = new TideApiError({ status: 404 })
    expect(tideApiError.status).toEqual(404)
  })
  it('should return an error message', () => {
    const tideApiError = new TideApiError({})
    expect(tideApiError.message).toEqual('Error')
  })
  it('should return a date ', () => {
    const tideApiError = new TideApiError({})
    expect(tideApiError.date).toBeDefined()
    expect(tideApiError.date instanceof Date).toBeTruthy()
  })
})
