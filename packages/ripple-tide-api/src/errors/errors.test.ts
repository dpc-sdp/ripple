import { expect, describe } from '@jest/globals'
import {
  BadRequestError,
  NotFoundError,
  UnauthorisedError,
  WrappedAxiosError
} from './errors'

describe('ripple-tide-api/errors', () => {
  it(`returns the error name`, () => {
    const error = new BadRequestError('Bad Request')
    expect(error.name).toEqual('BadRequestError')
  })

  it(`returns the correct status code for BadRequestError`, () => {
    const error = new BadRequestError('Bad Request')
    expect(error.statusCode).toEqual(400)
  })

  it(`returns the correct status code for NotFoundError`, () => {
    const error = new NotFoundError('Not Found')
    expect(error.statusCode).toEqual(404)
  })

  it(`returns the correct status code for UnauthorisedError`, () => {
    const error = new UnauthorisedError('Unauthorised')
    expect(error.statusCode).toEqual(401)
  })

  it(`exposes the axiosError`, () => {
    const response = { response: { status: 401 } }
    const error = new WrappedAxiosError('Unauthorised', response)
    expect(error.axiosError).toEqual(response)
  })
})
