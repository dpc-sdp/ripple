// Filters for adding extra process on a mapping value
import { logger } from './../../lib/core'

// Create more filters if need.
module.exports = {
  eventLatestEvents: async (list, { mapping }) => {
    try {
      const latestEvents = await list
      return latestEvents.map(item => {
        const location = mapping.parseField(['field_event_details', 0, 'field_paragraph_location'], item)
        return {
          image: mapping.parseField(['field_featured_image', 'field_media_image', 'url'], item),
          dateStart: mapping.parseField(['field_event_details', 0, 'field_paragraph_date_range', 'value'], item),
          dateEnd: mapping.parseField(['field_event_details', 0, 'field_paragraph_date_range', 'end_value'], item),
          location: mapping.filter(location, ['paragraphLocation']),
          title: item.title,
          summary: item.field_landing_page_summary,
          link: { text: 'See event details', url: item.path.url }
        }
      })
    } catch (error) {
      logger.error('Couldn\'t get latest events from Tide API.', { error, label: 'Event' })
      return []
    }
  },

  eventCtaCard: (fieldParagraphCtaCardEvent, { mapping }) => {
    if (!fieldParagraphCtaCardEvent.field_paragraph_cta) {
      return null
    }

    let image = ''
    if (fieldParagraphCtaCardEvent.field_paragraph_media) {
      const media = fieldParagraphCtaCardEvent.field_paragraph_media
      if (media.field_media_image) {
        image = media.field_media_image.url || media.field_media_image.uri
      }
    }

    const link = mapping.parseField('field_paragraph_cta', fieldParagraphCtaCardEvent)
    return {
      image: image,
      title: fieldParagraphCtaCardEvent.field_paragraph_title,
      summary: mapping.parseField(['field_paragraph_body', 'processed'], fieldParagraphCtaCardEvent),
      link: mapping.filter(link, ['paragraphCta'])
    }
  }
}
