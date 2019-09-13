module.exports = {
  include: {
    grant: [
      'field_audience',
      'field_node_guidelines',
      'field_node_guidelines.field_paragraph_accordion',
      'field_node_timeline',
      'field_node_timeline.field_timeline',
      'field_node_timeline.field_timeline.field_paragraph_media',
      'field_node_timeline.field_timeline.field_paragraph_media.field_media_image',
      'field_node_documents',
      'field_node_documents.field_media_file',
      'field_landing_page_contact',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media'
    ],
    landingPage: [
      'field_landing_page_component.field_timeline',
      'field_landing_page_component.field_timeline.field_paragraph_media',
      'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image'
    ]
  },
  mapping: {
    landingPageComponents: {
      'paragraph--timelines': {
        component: 'rpl-timeline',
        ssr: false,
        props: {
          'title': 'field_paragraph_title',
          'list': {
            field: ['field_timeline'],
            filters: ['timelineList']
          }
        }
      }
    }
  }
}
