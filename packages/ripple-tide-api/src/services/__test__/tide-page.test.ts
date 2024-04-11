import { expect, describe, it } from '@jest/globals'
import TidePageApi from './../tide-page'
import { exampleConfig, mockLogger } from './tide-config'

describe('TidePageApi', () => {
  describe('setContentMapping', () => {
    const tidePageApi = new TidePageApi(exampleConfig, mockLogger)

    it('should allow extending content type mapping', async () => {
      const type = 'landing_page'

      tidePageApi.setContentType(type, {
        mapping: {
          testSoloPageMappingItem: 'test_solo_page_mapping_item'
        }
      })
      tidePageApi.setContentType(type, {
        includes: ['test_solo_page_include_item']
      })
      tidePageApi.setContentType(type, {
        mapping: {
          testPageMappingItem: 'test_page_mapping_item'
        },
        includes: ['test_page_include_item']
      })

      expect(tidePageApi.contentTypes[type]).toEqual({
        mapping: {
          testPageMappingItem: 'test_page_mapping_item',
          testSoloPageMappingItem: 'test_solo_page_mapping_item'
        },
        includes: ['test_page_include_item', 'test_solo_page_include_item']
      })
    })
  })
})
