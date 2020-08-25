module.exports = {
  // Add webform component to landing page.
  include: {
    landingPage: [
      'field_landing_page_component.field_paragraph_webform'
    ],
    publicationPage: [
      'field_landing_page_component.field_paragraph_webform'
    ]
  },

  mapping: {
    landingPageComponents: {
      'paragraph--embedded_webform': {
        component: 'tide-form',
        props: {
          'title': 'field_paragraph_title',
          'formData': {
            field: 'field_paragraph_webform',
            filters: ['webform']
          }
        },
        class: ['tide-webform']
      }
    }
  }
}
