module.exports = {
  include: {
    publication: [
      'field_node_documents',
      'field_node_documents.field_media_file',
      'field_landing_page_contact',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media',
      'field_license_type',
      'field_landing_page_component',
      'field_landing_page_component.field_paragraph_accordion',
      'field_landing_page_component.field_complex_image_media',
      'field_landing_page_component.field_complex_image_media.field_media_image'
    ],
    publicationPage: [
      'field_node_primary_site',
      'field_node_site',
      'field_node_site.field_site_main_menu',
      'field_related_links',
      'field_landing_page_contact',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media',
      'field_landing_page_component',
      'field_landing_page_component.field_paragraph_media',
      'field_landing_page_component.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_paragraph_topic',
      'field_landing_page_component.field_timeline',
      'field_landing_page_component.field_timeline.field_paragraph_media',
      'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_paragraph_accordion',
      'field_landing_page_component.field_paragraph_keydates',
      'field_landing_page_component.field_paragraph_reference',
      'field_landing_page_component.field_paragraph_reference.field_topic',
      'field_landing_page_component.field_paragraph_reference.field_featured_image',
      'field_landing_page_component.field_paragraph_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_webform',
      'field_landing_page_component.field_paragraph_media_gallery',
      'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media',
      'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
      'field_landing_page_component.field_paragraph_items',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
      'field_landing_page_component.field_paragraph_items.field_paragraph_media',
      'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_complex_image_media',
      'field_landing_page_component.field_complex_image_media.field_media_image'
    ]
  },
  mapping: {
    landingPageComponents: {
      'paragraph--complex_image': {
        component: 'rpl-publication-image',
        props: {
          'title': 'field_complex_image_title',
          'source': 'field_complex_image_source',
          'html': ['field_complex_image_data', 'processed'],
          'fullscreen': 'field_complex_image_full_label',
          'download': 'field_complex_image_dl_label',
          'expand': 'field_complex_image_data_label',
          'expandTitle': 'field_complex_image_title',
          'image': {
            field: 'field_complex_image_media',
            filters: ['paragraphCtaImage']
          }
        }
      }
    }
  }
}
