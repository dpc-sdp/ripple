import { getField, getDocumentFromField } from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const tidePublicationPageModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping({
      withTopicTags: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    url: 'path.url',
    summary: 'field_landing_page_summary',
    showTopicTags: 'field_show_topic_term_and_tags',
    showInPageNav: 'field_show_table_of_content',
    inPageNavHeadingLevel: (src) => {
      if (src.field_node_display_headings === 'showH2AndH3') {
        return 'h3'
      }
      return 'h2'
    },
    breadcrumbs: (src: string) => [
      { text: 'Home', url: '/' },
      {
        text: getField(src, 'publication_navigation_root.meta.title'),
        url: getField(src, 'publication_navigation_root.meta.url')
      },
      { text: getField(src, 'title') }
    ],
    bodyComponents: async (src, tidePageApi) => {
      return await tidePageApi.getDynamicPageComponents(
        src,
        'field_landing_page_component'
      )
    },
    publication: {
      text: 'publication_navigation_root.meta.title',
      url: 'publication_navigation_root.meta.url',
      id: 'publication_navigation_root.meta.id',
      documents: (src) =>
        (
          getField(
            src,
            src.field_publication?.field_publication
              ? 'field_publication.field_publication.field_node_documents'
              : 'field_publication.field_node_documents'
          ) || []
        ).map((doc) => getDocumentFromField(doc)),
      pagination: {
        prev: {
          label: () => 'Previous',
          url: 'publication_navigation_prev.meta.url',
          description: 'publication_navigation_prev.meta.title'
        },
        next: {
          label: () => 'Next',
          url: 'publication_navigation_next.meta.url',
          description: 'publication_navigation_next.meta.title'
        }
      }
    },
    showLastUpdated: () => true
  },
  includes: [
    ...tidePageBaseIncludes({
      withTopicTags: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    'field_node_primary_site',
    'field_node_site.field_site_main_menu',
    'field_related_links',
    'field_publication',
    'field_publication.field_node_documents.field_media_file',
    'field_publication.field_publication',
    'field_publication.field_publication.field_node_documents.field_media_file',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_landing_page_component.field_paragraph_media.field_media_image',
    'field_landing_page_component.field_paragraph_topic',
    'field_landing_page_hero_image',
    'field_landing_page_hero_image.field_media_image'
  ]
}

export default tidePublicationPageModule
