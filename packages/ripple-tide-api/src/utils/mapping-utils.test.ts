import { expect, describe } from '@jest/globals'
import {
  removeDomainFromPath,
  getImageFromField,
  getCardImageFromField,
  getLinkFromField,
  getAddress,
  getBodyFromField,
  getField,
  getSiteKeyValues,
  getSiteSection,
  humanizeFilesize
} from './mapping-utils.js'

const field = {
    field_media_image: {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/file/file/7f3b1a29-76f1-4ec9-8991-0a42543588e4'
        }
      },
      meta: {
        alt: 'Demo: Melbourne tram',
        title: 'Demo: Melbourne tram',
        width: 900,
        height: 700,
        focal_point: {
          x: 50,
          y: 50
        },
        drupal_internal__target_id: 85
      },
      drupal_internal__fid: 85,
      langcode: 'en',
      filename: 'Melbourne-tram.jpg',
      uri: {
        value: 'public://tide_demo_content/Melbourne-tram.jpg',
        url: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg'
      },
      filemime: 'image/jpeg',
      filesize: 10654,
      status: true,
      created: '2023-10-25T22:41:42+00:00',
      changed: '2023-10-25T22:41:42+00:00',
      url: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
      id: '7f3b1a29-76f1-4ec9-8991-0a42543588e4',
      type: 'file--file'
    },
    field_card_image: {
      data: [
        {
          target_id: '44',
          alt: 'Demo: Melbourne tram',
          title: 'Demo: Melbourne tram',
          width: '1413',
          height: '785',
          _loaded: true,
          _accessCacheability: {}
        }
      ],
      url: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
      meta: {
        focal_point: {
          x: 700,
          y: 300
        }
      }
    },
    field_paragraph_link: {
      uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000332',
      title: '',
      options: [],
      entity: {
        uri: 'entity:node/179',
        entity_type: 'node',
        entity_id: '179',
        bundle: 'landing_page',
        uuid: '11dede11-10c0-111e1-1100-000000000332'
      },
      url: '/landing-page-cc-2',
      origin_url: '/landing-page-cc-2'
    },
    field_paragraph_location: {
      langcode: null,
      country_code: 'AU',
      administrative_area: 'VIC',
      locality: 'Melbourne',
      postal_code: '3001',
      address_line1: 'Level 14',
      address_line2: '35 Collins St'
    },
    field_paragraph_body: {
      value: '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>\r\n',
      format: 'rich_text',
      processed: '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>'
    },
    field_site_theme_values: [
      {
        key: 'rpl-clr-primary',
        description: null,
        value: '#6B19A3'
      },
      {
        key: 'rpl-clr-accent',
        description: null,
        value: '#6DDD97'
      },
      {
        key: 'neutral-theme',
        description: null,
        value: 'true'
      },
      {
        key: 'it-it-false-tho',
        description: null,
        value: 'false'
      }
    ],
    field_node_site: [
      {
        drupal_internal__tid: 179
      }
    ]
  },
  processedImg = {
    alt: 'Demo: Melbourne tram',
    focalPoint: {
      x: 50,
      y: 50
    },
    height: 700,
    src: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
    title: 'Demo: Melbourne tram',
    width: 900
  },
  processedCard = {
    alt: 'Demo: Melbourne tram',
    focalPoint: {
      x: 700,
      y: 300
    },
    height: 785,
    src: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
    title: 'Demo: Melbourne tram',
    width: 1413
  }

describe('ripple-tide-api/mapping utils', () => {
  it(`removes domain from a given path`, () => {
    expect(
      removeDomainFromPath('https://domain.com/sites/default/files')
    ).toEqual('/sites/default/files')
  })

  it(`processes api field data for images`, () => {
    expect(getImageFromField(field, 'field_media_image')).toEqual(processedImg)
  })

  it(`processes api field data for card images`, () => {
    expect(getCardImageFromField(field, 'field_card_image')).toEqual(
      processedCard
    )
  })

  it(`processes api field data for links`, () => {
    expect(getLinkFromField(field, 'field_paragraph_link')).toEqual({
      text: '',
      url: '/landing-page-cc-2'
    })
  })

  it(`returns null on invalid api key`, () => {
    expect(getLinkFromField(field, 'invalid')).toEqual(null)
  })

  it(`processes api field data for addresses`, () => {
    expect(getAddress(getField(field, 'field_paragraph_location'))).toEqual(
      'Level 14, 35 Collins St, Melbourne, VIC 3001'
    )
  })

  it(`returns a processed body from api field data`, () => {
    expect(getBodyFromField(field, 'field_paragraph_body')).toEqual(
      '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>'
    )
  })

  it(`returns a human readable filesize from a number`, () => {
    expect(humanizeFilesize(6870)).toEqual('6.71 KB')
  })

  it(`returns an empty string on null filesize`, () => {
    expect(humanizeFilesize(null)).toEqual('')
  })

  it(`returns a key-value object from a complex data structure`, () => {
    expect(getSiteKeyValues('field_site_theme_values', field)).toEqual({
      'rpl-clr-primary': '#6B19A3',
      'rpl-clr-accent': '#6DDD97',
      'neutral-theme': true,
      'it-it-false-tho': false
    })
  })

  it(`returns a site section using api response`, () => {
    expect(getSiteSection('', field)).toEqual({
      drupal_internal__tid: 179
    })
  })

  it(`returns a site section using param`, () => {
    expect(getSiteSection('179', field)).toEqual({
      drupal_internal__tid: 179
    })
  })

  it(`returns null if field_node_site has no data`, () => {
    expect(getSiteSection('', { field_node_site: {} })).toEqual(null)
  })
})
