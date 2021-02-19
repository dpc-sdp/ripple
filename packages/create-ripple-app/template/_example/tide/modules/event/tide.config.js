const fetchers = require('./mapping-fetchers')

// Grid columns setting for cards.
// TODO: make this is a core setting so we don't have a duplicated setting here.
const cardColsSetting = {
  wide: {
    m: 6,
    l: 4,
    xxxl: 3
  },
  narrow: {
    m: 6,
    xxxl: 4
  }
}

module.exports = {
  include: {
    event: [
      'field_landing_page_contact',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media',
      'field_event_category',
      'field_event_details',
      'field_event_details.field_event_requirements',
      'field_audience'
    ],

    landingPage: [
      'field_landing_page_component.field_paragraph_cta_card_event',
      'field_landing_page_component.field_paragraph_cta_card_event.field_paragraph_media',
      'field_landing_page_component.field_paragraph_cta_card_event.field_paragraph_media.field_media_image'
    ],
    publicationPage: [
      'field_landing_page_component.field_paragraph_cta_card_event',
      'field_landing_page_component.field_paragraph_cta_card_event.field_paragraph_media',
      'field_landing_page_component.field_paragraph_cta_card_event.field_paragraph_media.field_media_image'
    ]
  },

  mapping: {
    landingPageComponents: {
      'paragraph--card_event_auto': {
        component: 'rpl-card-event',
        props: {
          'image': [
            ['field_paragraph_reference', 'field_featured_image', 'field_media_image', 'url'],
            ['field_paragraph_reference', 'field_media_image', 'url']
          ],
          'dateStart': ['field_paragraph_reference', 'field_event_details', 0, 'field_paragraph_date_range', 'value'],
          'dateEnd': ['field_paragraph_reference', 'field_event_details', 0, 'field_paragraph_date_range', 'end_value'],
          'location': ['field_paragraph_reference', 'field_event_details', 0, 'field_paragraph_location', 'locality'],
          'title': ['field_paragraph_reference', 'title'],
          'summary': [
            ['field_paragraph_reference', 'field_landing_page_summary']
          ],
          'link': {
            filters: ['autoCardLink']
          }
        },
        cols: cardColsSetting
      },

      'paragraph--latest_events': {
        component: 'rpl-latest-events',
        props: {
          'title': 'field_paragraph_title',
          'events': {
            fetcher: fetchers.latestEvents,
            filters: ['eventLatestEvents']
          },
          'cta': {
            field: 'field_paragraph_cta_card_event',
            filters: ['eventCtaCard']
          },
          'link': {
            value: {
              text: 'See all events',
              url: '/whatson'
            }
          }
        }
      }
    }
  }
}
