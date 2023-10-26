import { expect, describe } from '@jest/globals'
import { removeDomainFromPath, getImageFromField } from './mapping-utils.js'

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
    }
  },
  processed = {
    alt: 'Demo: Melbourne tram',
    drupal_internal__target_id: 85,
    focalPoint: {
      x: 50,
      y: 50
    },
    height: 700,
    src: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
    title: 'Demo: Melbourne tram',
    width: 900
  }

describe('ripple-tide-api/mapping utils', () => {
  it(`removes domain from a given path`, () => {
    expect(
      removeDomainFromPath('https://domain.com/sites/default/files')
    ).toEqual('/sites/default/files')
  })

  it(`processes api field data for images`, () => {
    expect(getImageFromField(field, 'field_media_image')).toEqual(processed)
  })
})
