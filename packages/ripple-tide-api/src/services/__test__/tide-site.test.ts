import { expect, describe, it } from 'vitest'
import TideSiteApi from './../tide-site'
import { exampleConfig, mockLogger } from './tide-config'

describe('TideSiteApi', () => {
  describe('setSiteMapping', () => {
    const tideSiteApi = new TideSiteApi(exampleConfig, mockLogger)

    it('should allow extending site mapping', async () => {
      tideSiteApi.setSiteMapping({
        mapping: {
          testSoloSiteMappingItem: 'test_solo_site_mapping_item'
        }
      })
      tideSiteApi.setSiteMapping({
        includes: ['test_solo_site_include_item']
      })
      tideSiteApi.setSiteMapping({
        mapping: {
          testSiteMappingItem: 'test_site_mapping_item'
        },
        includes: ['test_site_include_item']
      })

      expect(tideSiteApi.siteMapping).toEqual({
        mapping: {
          testSiteMappingItem: 'test_site_mapping_item',
          testSoloSiteMappingItem: 'test_solo_site_mapping_item'
        },
        includes: ['test_site_include_item', 'test_solo_site_include_item']
      })
    })
  })
})
