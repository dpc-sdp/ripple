import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import { map as sidebarRelatedLinksMapping } from '../sidebar-related-links-mapping'

const result = [
  {
    id: '95d9896a-8109-4d50-b331-04b0189f4e33',
    url: 'https://www.vic.gov.au',
    text: 'State Government of Victoria'
  },
  {
    id: '3d451454-bac7-4936-8bfb-089f33e6999c',
    url: 'https://www.vic.gov.au/department-premier-and-cabinet',
    text: 'Department of Premier and Cabinet'
  }
]

describe('sidebarRelatedLinksMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data
  })

  it('should return an empty array when the related links display is switched off', () => {
    expect(
      sidebarRelatedLinksMapping({
        ...parsedData,
        field_show_related_content: false
      })
    ).toEqual([])
  })

  it('maps a raw json api response to an array of TideLinks', () => {
    expect(sidebarRelatedLinksMapping(parsedData)).toEqual(result)
  })
})
