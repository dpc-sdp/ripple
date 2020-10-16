import {
  getIncludesByType,
  getFilterTodayConditions
} from './../lib/card-collection-utils'

describe('getIncludesByType', () => {
  const defaultIncludes = [
    'title',
    'type',
    'changed',
    'field_topic_name',
    'url',
    'uuid',
    'field_media_image_absolute_path',
    'field_node_primary_csite',
    'field_landing_page_summary',
    'field_node_link'
  ]
  test('return default if no type passed', () => {
    expect(getIncludesByType()).toEqual(defaultIncludes)
  })
  test('return event types', () => {
    expect(getIncludesByType(['event'])).toEqual([
      ...defaultIncludes,
      'field_event_date_start_value',
      'field_event_details_event_address_1',
      'field_event_details_event_price_from',
      'field_event_date_end_value',
      'field_event_category_name'
    ])
  })
  test('return event and news types', () => {
    expect(getIncludesByType(['event', 'news'])).toEqual([
      ...defaultIncludes,
      'field_event_date_start_value',
      'field_event_details_event_address_1',
      'field_event_details_event_price_from',
      'field_event_date_end_value',
      'field_event_category_name',
      'field_event_intro_text'
    ])
  })
})

describe('getFilterTodayConditions', () => {
  test('return empty array if nothing set', () => {
    expect(getFilterTodayConditions()).toEqual([])
  })
  test('return empty array if all condition', () => {
    expect(
      getFilterTodayConditions({
        date_filter: {
          criteria: 'all'
        }
      })
    ).toEqual([])
  })
  test('return date filter if upcoming condition', () => {
    expect(
      getFilterTodayConditions(
        {
          date_filter: {
            criteria: 'upcoming',
            start_field: 'created',
            end_field: 'created'
          }
        },
        new Date(
          'Mon Oct 12 2020 23:41:37 GMT+1100 (Australian Eastern Daylight Time)'
        )
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "range": Object {
            "created": Object {
              "gte": 2020-10-12T12:41:37.000Z,
            },
          },
        },
      ]
    `)
  })
})
