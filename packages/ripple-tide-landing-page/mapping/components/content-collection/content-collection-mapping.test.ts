import { expect, describe, it } from 'vitest'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import {
  contentCollectionMapping,
  IContentCollection
} from './content-collection-mapping'
import { rawData } from './test-data'

describe('contentCollectionMapping', () => {
  it('maps a raw json api response to the correct structure for content collections', () => {
    const expectedResult: TideDynamicPageComponent<IContentCollection> = {
      component: 'TideLandingPageContentCollection',
      id: '1437',
      title: 'News & Landing Pages',
      props: {
        description: '<p>All about News &amp; Landing Pages, with topics.</p>',
        link: {
          text: 'View all',
          url: '#'
        },
        searchQuery: {
          query: {
            bool: {
              filter: [
                {
                  bool: {
                    should: [
                      {
                        terms: {
                          type: ['landing_page', 'news']
                        }
                      }
                    ]
                  }
                },
                {
                  bool: {
                    should: [
                      {
                        terms: {
                          field_topic: [8941, 8940]
                        }
                      }
                    ]
                  }
                },
                {
                  bool: {
                    should: [
                      {
                        term: {
                          field_node_site: '8888'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          size: 6,
          from: 0,
          sort: [
            {
              field_news_date: 'desc'
            },
            {
              created: 'desc'
            }
          ]
        },
        display: {
          type: 'card',
          style: 'thumbnail'
        }
      }
    }

    expect(contentCollectionMapping(rawData, {}, { site: '8888' })).toEqual(
      expectedResult
    )
  })
})
