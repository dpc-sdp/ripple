import { getField, getLinkFromField } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import { getSideBarComponents, getBodyComponents } from '@dpc-sdp/ripple-tide-api/src/services/utils/dynamic-components'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-publication/publication-page.vue'),
  mapping: {
    title: 'title',
    breadcrumbs: (src) => [
      { text: 'Home', url: '/' },
      { text: getField(src, 'publication_navigation_root.meta.title'), url: getField(src, 'publication_navigation_root.meta.url') },
      { text: getField(src, 'title') }
    ],
    heroBanner: {
      links: (src) => src.field_landing_page_key_journeys?.field_paragraph_links?.map(l => getLinkFromField(l)),
      title: 'title',
      introText: 'field_landing_page_intro_text',
      image: 'field_featured_image.field_media_image.url',
      backgroundGraphic: () => '/img/header-pattern-bottom.png',
      visible: () => true
    },
    publicationPagination: (src) => ({
      previousLink: getField(src, 'publication_navigation_prev.meta.url'),
      previousText: truncateText(getField(src, 'publication_navigation_prev.meta.title'), 40),
      previousDescription: truncateText(getField(src, 'publication_navigation_prev.meta.field_landing_page_summary'), 60),
      nextLink: getField(src, 'publication_navigation_next.meta.url'),
      nextText: truncateText(getField(src, 'publication_navigation_next.meta.title'), 40),
      nextDescription: truncateText(getField(src, 'publication_navigation_next.meta.field_landing_page_summary'), 60)
    }),
    sidebarComponents: getSideBarComponents,
    dynamicComponents: getBodyComponents,
    showLastUpdated: () => true
  },
  includes: [
    'field_node_primary_site',
    'field_node_site.field_site_main_menu',
    'field_related_links',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_landing_page_component.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_topic',
    'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_accordion',
    'field_landing_page_component.field_paragraph_keydates',
    'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
    'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
    'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
    'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_complex_image_media.field_media_image',
    'field_landing_page_hero_image.field_media_image'
  ]
}
