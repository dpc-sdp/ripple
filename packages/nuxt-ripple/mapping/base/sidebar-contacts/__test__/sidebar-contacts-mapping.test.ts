import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import { map as sidebarContactsMapping } from '../sidebar-contacts-mapping'

const result = [
  {
    id: '4d56f164-bd14-4fee-a1e8-e28b0c4857f4',
    contactTitle: 'Contact Us',
    contactName: 'Victorian Government',
    department: 'Department of Premier and Cabinet',
    email: 'no-reply@vic.gov.au',
    locationAddress: {
      countryCode: 'AU',
      administrativeArea: 'VIC',
      locality: 'Melbourne',
      postalCode: '3001',
      addressLine1: 'Level 14',
      addressLine2: '35 Collins St'
    },
    postalAddress: {
      countryCode: 'AU',
      administrativeArea: 'VIC',
      locality: 'Melbourne',
      postalCode: '3001',
      addressLine1: 'Department of Premier and Cabinet',
      addressLine2: 'GPO Box 4509'
    },
    phones: [
      {
        id: '90f53d00-031d-4405-bf39-8ef00d9f1fd6',
        title: 'Calls in Australia',
        number: '1300 366 356'
      },
      {
        id: 'd962794f-1f17-4efe-ab4d-0e91aeb5b9bb',
        title: 'Calls from overseas',
        number: '+61 3 9603 8804'
      }
    ],
    socialMedia: [
      {
        id: '2a2c0720-5521-4024-bea0-93af3c4795e2',
        type: 'twitter',
        text: 'Twitter',
        url: 'https://twitter.com/VicGovAu'
      }
    ]
  },
  {
    id: 'b51eed7e-939a-49a2-ba64-427edfe905e6',
    contactTitle: 'Second Contact',
    contactName: 'Another contact',
    department: 'Department of Education',
    email: 'contact@vic.gov.au',
    locationAddress: null,
    postalAddress: null,
    phones: [],
    socialMedia: []
  }
]

describe('sidebarContactsMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data
  })

  it('should return an empty array when the contacts display is switched off', () => {
    expect(
      sidebarContactsMapping({
        ...parsedData,
        field_landing_page_show_contact: false
      })
    ).toEqual([])
  })

  it('maps a raw json api response to the TideContact structure', () => {
    expect(sidebarContactsMapping(parsedData)).toEqual(result)
  })
})
