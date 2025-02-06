import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import { map as sidebarSocialShareMapping } from '../sidebar-social-share-mapping'

describe('sidebarSocialShareMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data
  })

  it('should return an empty array when social share display is switched off', () => {
    expect(
      sidebarSocialShareMapping({
        ...parsedData,
        field_show_social_sharing: false
      })
    ).toEqual([])
  })

  it('should return the default list of networks when social share display is switched on', () => {
    expect(sidebarSocialShareMapping(parsedData)).toEqual([
      'Facebook',
      'X',
      'LinkedIn'
    ])
  })
})
