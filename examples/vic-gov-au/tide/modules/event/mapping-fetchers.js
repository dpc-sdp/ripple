// This file provides fetcher objects for our mapping to fetch data from Tide API.
// const moment = require('moment-timezone')

module.exports = {
  latestEvents: {
    method: 'getContentList',
    args: [
      'event',
      {
        // TODO: https://digital-engagement.atlassian.net/browse/SDPA-1938
        // 'date-filter': {
        //   condition: {
        //     path: 'field_event_details.0.field_paragraph_date_range.end_value',
        //     operator: '>',
        //     value: moment().tz('Australia/Melbourne').format()
        //   }
        // }
      },
      [
        'field_event_details',
        'field_featured_image',
        'field_featured_image.field_media_image'
      ],
      {
        offset: 0,
        limit: 6
      },
      {
        'sort-end': {
          path: 'field_event_details.0.field_paragraph_date_range.end_value'
        },
        'sort-start': {
          path: 'field_event_details.0.field_paragraph_date_range.value'
        }
      },
      {
        allPages: false
      }
    ]
  }
}
