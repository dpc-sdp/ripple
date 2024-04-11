import { expect, describe, it } from '@jest/globals'
import TideApiBase from './../tide-api-base'
import { exampleConfig, exampleApiConfig, mockLogger } from './tide-config'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mockClient = new MockAdapter(axios)

describe('TideApiBase', () => {
  describe('getMappedData', () => {
    const tideApiBase = new TideApiBase(exampleConfig, mockLogger)
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
    const tideApiBase = new TideApiBase(exampleConfig, mockLogger)
    it('should call http client get method', async () => {
      mockClient.onGet(`${exampleApiConfig.apiPrefix}/site`).reply(
        200,
        {
          field: 'test'
        },
        {
          testHeader: 'test123'
        }
      )
      const result = await tideApiBase.get('/site')
      expect(result.data).toEqual({ field: 'test' })
      expect(result.headers.testHeader).toEqual('test123')
      mockClient.reset()
    })
  })
})
