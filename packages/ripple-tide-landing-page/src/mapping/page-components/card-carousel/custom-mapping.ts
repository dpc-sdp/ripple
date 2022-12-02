import { getField } from '@dpc-sdp/ripple-tide-api'

export const mapping = (field) => {
  let item = {}

  switch (field.type) {
    case 'paragraph--card_event':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_title'),
        url: getField(field, 'field_paragraph_cta.url'),
        image: getField(field, 'field_paragraph_media.thumbnail.url'),
        meta: {
          tag: getField(field, 'field_topic.name'),
          dateRange: {
            start: getField(field, 'field_paragraph_date_range.value'),
            end: getField(field, 'field_paragraph_date_range.end_value')
          }
        },
        summary: getField(field, 'field_paragraph_summary')
      }
      break
    case 'paragraph--card_event_auto':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_reference.title'),
        url: getField(field, 'field_paragraph_reference.path.url'),
        image:
          getField(
            field,
            'field_paragraph_reference.field_featured_image.field_media_image.url'
          ) ||
          getField(field, 'field_paragraph_reference.field_media_image.url'),
        meta: {
          tag: getField(field, 'field_topic.name'),
          dateRange: {
            start: getField(
              field,
              'field_paragraph_reference.field_event_details[0].field_paragraph_date_range.value'
            ),
            end: getField(
              field,
              'field_paragraph_reference.field_event_details[0].field_paragraph_date_range.end_value'
            )
          }
        },
        summary: getField(
          field,
          'field_paragraph_reference.field_landing_page_summary'
        )
      }
      break
    case 'paragraph--card_keydates':
      item = {
        type: 'keydates',
        url: getField(field, 'field_paragraph_cta.url'),
        title: getField(field, 'field_paragraph_cta.title'),
        keyDates: field.field_paragraph_keydates.map((date) => ({
          title: getField(date, 'field_paragraph_keydate'),
          subtitle: getField(date, 'field_paragraph_title'),
          content: getField(date, 'field_paragraph_summary')
        }))
      }
      break
    case 'paragraph--card_promotion':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_title'),
        url: getField(field, 'field_paragraph_link.url'),
        image: getField(field, 'field_paragraph_media.thumbnail.url'),
        meta: {
          tag: getField(field, 'field_paragraph_topic.[0].name'),
          date: getField(field, 'field_paragraph_date')
        },
        summary: getField(field, 'field_paragraph_summary')
      }
      break
    case 'paragraph--card_promotion_auto':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_reference.title'),
        url: getField(field, 'field_paragraph_reference.path.url'),
        image: getField(
          field,
          'field_paragraph_reference.field_media_image.url'
        ),
        meta: {
          tag: getField(field, 'field_paragraph_display_topic', false)
            ? getField(field, 'field_paragraph_reference.field_topic.name')
            : null,
          date: getField(field, 'field_paragraph_reference.created')
        },
        summary: getField(
          field,
          'field_paragraph_reference.field_landing_page_summary'
        )
      }
      break
  }

  return item
}
