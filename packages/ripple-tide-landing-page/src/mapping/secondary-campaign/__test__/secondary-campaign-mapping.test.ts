import * as jsonapiParse from 'jsonapi-parse'
import { expect, describe, it } from '@jest/globals'
import {
  secondaryCampaignMapping,
  ITideSecondaryCampaign
} from '../secondary-campaign-mapping'
import { testData, testDataNull } from './test-data'

describe('secondaryCampaignMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const parsedData = jsonapiParse.parse(testData).data

    const result: ITideSecondaryCampaign = {
      title: 'Another Demo Campaign',
      summaryHtml: '<p>Test processed HTML</p>',
      cta: {
        text: 'Find out more',
        url: 'https://www.vic.gov.au'
      },
      image: {
        src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
        alt: 'Demo: Melbourne tram',
        title: 'Demo: Melbourne tram',
        width: 1413,
        height: 785
      },
      imageCaption: 'Caption for Melbourne tram photo'
    }

    expect(secondaryCampaignMapping(parsedData)).toEqual(result)
  })

  it('returns null if there is no secondary campaign', () => {
    const parsedData = jsonapiParse.parse(testDataNull).data

    expect(secondaryCampaignMapping(parsedData)).toEqual(null)
  })
})
