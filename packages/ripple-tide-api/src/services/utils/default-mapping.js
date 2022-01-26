export default {
  mapping: {
    title: 'title',
    changed: 'changed',
    created: 'created',
    type: data => data.type && data.type.replace('node--', ''),
    nid: 'drupal_internal__nid'
  },
  includes: [
    'field_node_site.field_site_main_menu',
    'field_node_site.field_site_og_image.field_media_image',
    'field_featured_image.field_media_image',
    'field_node_site.field_site_twitter_image.field_media_image',
    'field_tags',
    'field_topic',
    'field_related_links'
  ]
}
