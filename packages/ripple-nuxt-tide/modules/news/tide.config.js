module.exports = {
  include: {
    news: [
      'field_location',
      'field_node_department',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media'
    ]
  },

  mapping: {
    landingPageComponents: {

      'paragraph--news_listing': {
        component: 'rpl-news-listing',
        props: {
          'title': 'field_paragraph_title',
          'list': {
            field: ['field_paragraph_topic'],
            filters: ['newsListing']
          }
        }
      }
    }
  }
}
