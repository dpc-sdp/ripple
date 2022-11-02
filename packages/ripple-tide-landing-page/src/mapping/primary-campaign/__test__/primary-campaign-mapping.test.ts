import * as jsonapiParse from 'jsonapi-parse'
import { expect, describe, it } from '@jest/globals'
import {
  primaryCampaignMapping,
  ITidePrimaryCampaign
} from '../primary-campaign-mapping'
import { testData, testDataNull } from './test-data'

describe('primaryCampaignMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(testData).data
  })

  it('maps a raw json api response to the correct structure', () => {
    const result: ITidePrimaryCampaign = {
      title: 'Demo Campaign',
      summaryHtml: '<p>Test processed HTML</p>',
      cta: {
        text: 'Find out more',
        url: 'https://www.vic.gov.au'
      },
      image: {
        src: '/sites/default/files/tide_demo_content/Melbourne-skyline-at-dusk.jpg',
        alt: 'Demo: Melbourne skyline at dusk',
        title: 'Demo: Melbourne skyline at dusk',
        width: 2560,
        height: 650
      },
      imageCaption: 'TEST_MEDIA_CAPTION'
    }

    expect(primaryCampaignMapping(parsedData)).toEqual(result)
  })

  it('should return imageCaption as null if the image caption is hidden', () => {
    const result: ITidePrimaryCampaign = {
      title: 'Demo Campaign',
      summaryHtml: '<p>Test processed HTML</p>',
      cta: {
        text: 'Find out more',
        url: 'https://www.vic.gov.au'
      },
      image: {
        src: '/sites/default/files/tide_demo_content/Melbourne-skyline-at-dusk.jpg',
        alt: 'Demo: Melbourne skyline at dusk',
        title: 'Demo: Melbourne skyline at dusk',
        width: 2560,
        height: 650
      },
      imageCaption: null
    }

    expect(
      primaryCampaignMapping({
        ...parsedData,
        field_show_c_primary_caption: false
      })
    ).toEqual(result)
  })

  it('returns null if there is no primary campaign', () => {
    const parsedDataNull = jsonapiParse.parse(testDataNull).data

    expect(primaryCampaignMapping(parsedDataNull)).toEqual(null)
  })
})
