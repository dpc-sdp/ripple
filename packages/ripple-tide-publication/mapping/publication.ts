import { getField, getDocumentFromField } from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'

const chapters = (src: string) =>
  getField(src, 'publication_children')
    .filter((x) => x.meta)
    .map((item) => ({
      id: item.meta.id,
      title: getField(item.meta, 'title', ''),
      summary: getField(item.meta, 'field_landing_page_summary', ''),
      url: item.meta.url
    }))

const tidePublicationModule: IRplTideModuleMapping = {
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
    details: {
      author: (src) => {
        if (Array.isArray(src.field_publication_authors)) {
          return src.field_publication_authors.map((x) => x.name).join(', ')
        }
        return src.field_publication_authors?.name
      },
      date: 'field_publication_date',
      copyright: 'field_license_type.description'
    },
    chapters,
    bodyComponents: async (src, tidePageApi) => {
      return await tidePageApi.getDynamicPageComponents(
        src,
        'field_landing_page_component'
      )
    },
    publication: {
      text: 'title',
      url: 'path.url',
      id: 'id',
      documents: (src: string) =>
        getField(src, 'field_node_documents').map((doc) =>
          getDocumentFromField(doc)
        )
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
    'field_node_documents.field_media_file',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_landing_page_hero_image',
    'field_landing_page_hero_image.field_media_image',
    'field_license_type',
    'field_landing_page_component.field_complex_image_media.field_media_image',
    'field_publication_authors',
    'field_related_links'
  ]
}

export default tidePublicationModule
