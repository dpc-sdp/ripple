import { expect, describe, it } from '@jest/globals'
import TideApiBase from './../tide-api-base'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mockClient = new MockAdapter(axios)

const mockLogger = {
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

const exampleMapping = {
  includes: [],
  mapping: {
    test: 'field'
  }
}

const exampleApiConnection = {
  site: '123',
  baseUrl: ''
}

const exampleApiConfig = {
  apiPrefix: '/api/v1'
}

describe('TideApiBase', () => {
  describe('getMappedData', () => {
    const tideApiBase = new TideApiBase(
      {
        ...exampleApiConnection,
        debug: false,
        mapping: {
          site: exampleMapping,
          event: exampleMapping
        },
        ...exampleApiConfig
      },
      mockLogger
    )
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
    const tideApiBase = new TideApiBase(
      {
        ...exampleApiConnection,
        debug: false,
        mapping: {
          site: exampleMapping,
          event: exampleMapping
        },
        ...exampleApiConfig
      },
      mockLogger
    )
    it('should call http client get method', async () => {
      mockClient.onGet(`${exampleApiConfig.apiPrefix}/site`).reply(200, {
        field: 'test'
      })
      const result = await tideApiBase.get('/site')
      expect(result).toEqual({ field: 'test' })
      mockClient.reset()
    })
  })
})
