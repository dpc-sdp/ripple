import { expect, describe, it } from '@jest/globals'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  customCollectionMapping,
  IContentCollection
} from './custom-collection-mapping'
import { rawData } from './test-data'

describe('contentCollectionMapping', () => {
  it.skip('maps a raw json api response to the correct structure for content collections', () => {
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
            type: 'any',
            field: 'field_topic',
            values: [8941, 8940]
          },
          {
            type: 'any',
            field: 'field_node_site',
            values: ['8888']
          }
        ],
        sortBy: [
          {
            field: 'field_news_date',
            direction: 'desc'
          },
          {
            field: 'created',
            direction: 'desc'
          }
        ],
        perPage: 6,
        display: {
          type: 'card',
          style: 'thumbnail'
        }
      }
    }

    expect(customCollectionMapping(rawData, {}, { site: '8888' })).toEqual(
      result
    )
  })
})
