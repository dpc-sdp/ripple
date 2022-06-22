import { expect, describe, it } from '@jest/globals'
import TideApiBase from './../tide-api-base'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mockClient = new MockAdapter(axios)

const exampleMapping = {
  includes: [],
  mapping: {
    test: 'field'
  }
}
const exampleApiConfig = {
  site: '123',
  baseUrl: '',
  apiPrefix: '/api/v1'
}

describe('TideApiBase', () => {
  describe('getMappedData', () => {
    const tideApiBase = new TideApiBase({
      debug: false,
      contentApi: exampleApiConfig,
      mapping: {
        site: exampleMapping,
        content: {
          event: exampleMapping
        }
      }
    })
    it('should return mapped data', async () => {
      const mapping = {
        stringField: 'title',
        objNotation: 'obj.name',
        fnField: () => 'hello',
        arrayField: ['obj', 'name'],
        objField: {
          stringField: 'title',
          fnField: () => 'hello',
          arrayField: ['obj', 'name']
        }
      }
      const resource = {
        title: 'test title',
        obj: {
          name: 'test'
        }
      }

      const mappedData = await tideApiBase.getMappedData(mapping, resource)
      expect(mappedData).toEqual({
        stringField: 'test title',
        objNotation: 'test',
        fnField: 'hello',
        arrayField: 'test',
        objField: {
          stringField: 'test title',
          fnField: 'hello',
          arrayField: 'test'
        }
      })
    })
  })
  describe('get', () => {
    const tideApiBase = new TideApiBase({
      contentApi: exampleApiConfig,
      debug: false,
      mapping: {
        site: exampleMapping,
        content: {
          event: exampleMapping
        }
      }
    })
    it('should call http client get method', async () => {
      mockClient.onGet(`${exampleApiConfig.apiPrefix}/site`).reply(200, {
        field: 'test'
      })
      const result = await tideApiBase.get('/site')
      expect(result).toEqual({ field: 'test' })
      mockClient.reset()
    })
  })
  describe('handleError', () => {
    const tideApiBase = new TideApiBase({
      contentApi: exampleApiConfig,
      debug: true,
      mapping: {
        site: exampleMapping,
        content: {
          event: exampleMapping
        }
      }
    })
    it('should return 404 error', () => {
      const test = tideApiBase.handleError('there was an error', 404)
      expect(test).toEqual({
        debug: 'there was an error',
        status: 404,
        message: 'Page not found'
      })
    })
    it('should return 403 error as 404', () => {
      const test = tideApiBase.handleError('forbidden', 403)
      expect(test).toEqual({
        debug: 'forbidden',
        status: 404,
        message: 'Page not found'
      })
    })
    it('should return 400 error', () => {
      const test = tideApiBase.handleError('error', 400)
      expect(test).toEqual({
        debug: 'error',
        status: 400,
        message: 'Bad request'
      })
    })
    it('should return 500 error by default', () => {
      const test = tideApiBase.handleError()
      expect(test).toEqual({
        debug: 'error',
        status: 500,
        message: 'Server is not available'
      })
    })
  })
})
