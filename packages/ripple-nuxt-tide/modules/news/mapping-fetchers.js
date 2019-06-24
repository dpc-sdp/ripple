// This file provides fetcher objects for our mapping to fetch data from Tide API.

module.exports = {
  /**
   * Returns a fetcher object which filters on topic / tag tid provided.
   * @param {Array} topics - filter by topic tid.
   * @param {Array} tags - filter by tag tid.
   */
  getNewsList (topics, tags) {
    let fetcher = {
      method: 'getContentList',
      args: [
        'news',
        {
          // The filters are dynamic and added below.
        },
        [
          'field_topic'
        ],
        {
          offset: 0,
          limit: 6
        },
        {
          'sort-start': {
            path: 'field_news_date',
            direction: 'DESC'
          }
        },
        {
          allPages: false
        }
      ]
    }

    // Add group.
    if (topics.length > 0 || tags.length > 0) {
      fetcher.args[1]['topic-tag-group'] = {
        group: {
          conjunction: 'OR'
        }
      }
    }

    // Filter by topics.
    if (topics.length > 0) {
      // Add each of the topic ids.
      topics.forEach((tid, index) => {
        fetcher.args[1][`topic-${index}`] = {
          condition: {
            path: 'field_topic.drupal_internal__tid',
            operator: '=',
            value: tid,
            memberOf: 'topic-tag-group'
          }
        }
      })
    }

    // Filter by tags.
    if (tags.length > 0) {
      // Add each of the tag tids.
      tags.forEach((tid, index) => {
        fetcher.args[1][`tag-${index}`] = {
          condition: {
            path: 'field_tags.drupal_internal__tid',
            operator: '=',
            value: tid,
            memberOf: 'topic-tag-group'
          }
        }
      })
    }

    return fetcher
  },

  latestNewsCards: {
    method: 'getContentList',
    args: [
      'news',
      {},
      [
        'field_topic',
        'field_featured_image',
        'field_featured_image.field_media_image'
      ],
      {
        offset: 0,
        limit: 9
      },
      {
        'sort-start': {
          path: 'field_news_date',
          direction: 'DESC'
        }
      },
      {
        allPages: false
      }
    ]
  }
}
