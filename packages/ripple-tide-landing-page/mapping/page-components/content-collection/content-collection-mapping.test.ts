import { expect, describe, it } from '@jest/globals'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  contentCollectionMapping,
  IContentCollection
} from './content-collection-mapping'
import { rawData } from './test-data'

describe('contentCollectionMapping', () => {
  it('maps a raw json api response to the correct structure for content collections', () => {
    const result: TideDynamicPageComponent<IContentCollection> = {
      component: 'TideLandingPageContentCollection',
      id: '1437',
      title: 'News & Landing Pages',
      props: {
        description: '<p>All about News &amp; Landing Pages, with topics.</p>',
        link: {
          text: 'View all',
          url: '#'
        },
        filters: [
          {
            type: 'any',
            field: 'type',
            values: ['landing_page', 'news']
          },
          {
            type: 'all',
            field: 'field_topic',
            values: [8941, 8940]
          }
        ],
        sortBy: {
          field: 'created',
          direction: 'desc'
        },
        perPage: 6,
        display: {
          component: 'RplCardPromoCard',
          style: 'thumbnail'
        }
      }
    }

    expect(contentCollectionMapping(rawData)).toEqual(result)
  })
})
