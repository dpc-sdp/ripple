module.exports = {
  include: {
    news: [
      'field_location',
      'field_node_department',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media'
    ],

    landingPage: [
      'field_landing_page_component.field_paragraph_news_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_news_reference.field_topic'
    ],
    publicationPage: [
      'field_landing_page_component.field_paragraph_news_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_news_reference.field_topic'
    ]
  },

  mapping: {
    landingPageComponents: {
      'paragraph--featured_news': {
        component: 'rpl-featured-news',
        props: {
          'list': {
            field: ['field_paragraph_news_reference'],
            filters: ['featuredNews']
          }
        }
      },

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
