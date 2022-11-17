import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes,
  getImageFromField,
  getBodyFromField,
  getField,
  formatDate,
  getDynamicPageComponents
} from '@dpc-sdp/ripple-tide-api'
import {
  landingPageComponentsMapping,
  landingPageComponentsIncludes
} from '@dpc-sdp/ripple-tide-landing-page'

const tideNewsModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-news/component',
  schema: '@dpc-sdp/ripple-tide-news/types',
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSiteSectionNav: true,
      withSidebarSocialShare: true
    }),
    header: {
      title: 'title',
      summary: 'field_news_intro_text'
    },
    details: {
      published: (src) =>
        formatDate(getField(src, 'field_news_date'), {
          timeStyle: 'short'
        }),
      location: (src) =>
        getField(src, 'field_location')
          .map(({ name }) => name)
          .join(', '),
      department: (src) => getField(src, 'field_node_department.name')
    },
    body: {
      image: (src) =>
        getImageFromField(src, 'field_featured_image.field_media_image'),
      caption: (src) =>
        getField(src, 'field_featured_image.field_media_caption'),
      content: (src) => getBodyFromField(src, 'body')
    },
    dynamicComponents: async (src: any) => {
      return await getDynamicPageComponents(
        src,
        'field_landing_page_component',
        landingPageComponentsMapping
      )
    }
  },
  includes: [
    ...tidePageBaseIncludes({
      withTopicTags: true,
      withSidebarSiteSectionNav: true,
      withSidebarContacts: true,
      withSidebarRelatedLinks: true,
      withSidebarSocialShare: true
    }),
    ...landingPageComponentsIncludes,
    'field_location',
    'field_node_department',
    'field_featured_image',
    'field_featured_image.field_media_image'
  ]
}

export default tideNewsModule
