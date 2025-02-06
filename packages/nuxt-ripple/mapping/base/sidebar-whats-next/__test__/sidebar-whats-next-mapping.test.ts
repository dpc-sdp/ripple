import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import { map as sidebarWhatsNextMapping } from '../sidebar-whats-next-mapping'

const result = [
  {
    id: '9e657868-f144-43a5-ad25-55631389a93d',
    url: '/sdpta-related-links-landing-page-17-10-2022-0',
    text: 'Demo publication'
  },
  {
    id: '39ec6fff-595e-45e1-8991-dd8fdf5d22b5',
    url: '/sdpta-publication-test-content-publication-08-10-2022',
    text: 'Testing link'
  }
]

describe('sidebarWhatsNextMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data
  })

  it('should return an empty array when the whats next display is switched off', () => {
    expect(
      sidebarWhatsNextMapping({
        ...parsedData,
        field_show_whats_next: false
      })
    ).toEqual([])
  })

  it('maps a raw json api response to an array of TideLinks', () => {
    expect(sidebarWhatsNextMapping(parsedData)).toEqual(result)
  })
})
