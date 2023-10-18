import {
  getField,
  getImageFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

const getCardImage = (card) => {
  if (card?.field_featured_image) {
    return getImageFromField(card, 'field_featured_image.field_media_image')
  } else {
    return getImageFromField(card, 'field_media_image')
  }
}

export const mapping = (field) => {
  let item = {}

  switch (field.type) {
    case 'paragraph--card_event':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_title', ''),
        url: getField(field, 'field_paragraph_cta.url', ''),
        image: getImageFromField(
          field,
          'field_paragraph_media.field_media_image'
        ),
        meta: {
          topic: getField(field, 'field_topic.name', null),
          dateStart: getField(field, 'field_paragraph_date_range.value', null),
          dateEnd: getField(field, 'field_paragraph_date_range.end_value', null)
        },
        summary: getField(field, 'field_paragraph_summary', '')
      }
      break
    case 'paragraph--card_event_auto':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_reference.title', ''),
        url: getField(field, 'field_paragraph_reference.path.url', ''),
        image: getCardImage(field.field_paragraph_reference),
        meta: {
          topic: getField(field, 'field_topic.name', null),
          dateStart: getField(
            field,
            'field_paragraph_reference.field_event_details[0].field_paragraph_date_range.value',
            null
          ),
          dateEnd: getField(
            field,
            'field_paragraph_reference.field_event_details[0].field_paragraph_date_range.end_value',
            null
          )
        },
        summary: getField(
          field,
          'field_paragraph_reference.field_landing_page_summary',
          ''
        )
      }
      break
    case 'paragraph--card_keydates':
      item = {
        type: 'keydates',
        url: getLinkFromField(field, 'field_paragraph_cta')?.url,
        title: getField(field, 'field_paragraph_cta.title', ''),
        keyDates: field.field_paragraph_keydates.map((date) => ({
          title: getField(date, 'field_paragraph_keydate', ''),
          subtitle: getField(date, 'field_paragraph_title', ''),
          content: getField(date, 'field_paragraph_summary', '')
        }))
      }
      break
    case 'paragraph--card_promotion':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_title', ''),
        url: getLinkFromField(field, 'field_paragraph_link')?.url,
        image: getImageFromField(
          field,
          'field_paragraph_media.field_media_image'
        ),
        meta: {
          topic: getField(field, 'field_paragraph_topic.[0].name', null),
          date: getField(field, 'field_paragraph_date', null)
        },
        summary: getField(field, 'field_paragraph_summary', '')
      }
      break
    case 'paragraph--card_promotion_auto':
      item = {
        type: 'promo',
        title: getField(field, 'field_paragraph_reference.title', ''),
        url: getLinkFromField(field, 'field_paragraph_reference.path')?.url,
        image: getCardImage(field.field_paragraph_reference),
        meta: {
          topic: getField(field, 'field_paragraph_display_topic', false)
            ? getField(
                field,
                'field_paragraph_reference.field_topic.name',
                null
              )
            : null,
          date: getField(field, 'field_paragraph_reference.created', null)
        },
        summary: getField(
          field,
          'field_paragraph_reference.field_landing_page_summary',
          ''
        )
      }
      break
  }

  return item
}
