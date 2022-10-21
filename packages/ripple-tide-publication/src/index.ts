import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import { getField, getLinkFromField } from '@dpc-sdp/ripple-tide-api'

const chapters = (src: string) =>
  getField(src, 'publication_children')
    .filter((x: any) => x.meta)
    .map((item: any) => ({
      id: item.meta.id,
      title: getField(item.meta, 'title', ''),
      summary: getField(item.meta, 'field_landing_page_summary', ''),
      link: {
        url: item.meta.url,
        text: 'Read more'
      }
    }))

const tidePublicationModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-publication/component',
  schema: '@dpc-sdp/ripple-tide-publication/types',
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true
    }),
    header: {
      title: 'title',
      summary: 'field_landing_page_intro_text'
    },
    heroBanner: {
      links: (src: any) =>
        src.field_landing_page_key_journeys?.field_paragraph_links?.map(
          (l: string) => getLinkFromField(l)
        ),
      title: 'title',
      introText: 'field_landing_page_intro_text',
      image: 'field_featured_image.field_media_image.url',
      theme: () => 'dark',
      showLinks: () => false,
      visible: () => true
    },
    summary: 'field_landing_page_summary',
    intro: 'field_landing_page_intro_text',
    breadcrumbs: (src: string) => [
      { text: 'Home', url: '/' },
      { text: getField(src, 'title') }
    ],
    details: {
      author: (src: any) =>
        src.field_publication_authors.map((x: any) => x.name).join(', '),
      date: 'field_publication_date',
      copyright: 'field_license_type.description'
    },
    chapters,
    // sidebarComponents: getSideBarComponents,
    // dynamicComponents: getBodyComponents,
    dynamicComponents: [],
    showLastUpdated: () => true
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true
    }),
    'field_node_documents.field_media_file',
    'field_landing_page_contact.field_paragraph_phones',
    'field_landing_page_contact.field_paragraph_social_media',
    'field_landing_page_hero_image.field_media_image',
    'field_license_type',
    'field_landing_page_component.field_paragraph_accordion',
    'field_landing_page_component.field_complex_image_media.field_media_image',
    'field_publication_authors',
    'field_related_links'
  ]
}

export default tidePublicationModule
