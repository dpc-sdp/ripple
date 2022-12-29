---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.ts
---

import {
  getField,
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tide<%= h.changeCase.pascalCase(name) %>Module: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>/component',
  schema: '@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>/types',
  mapping: {
    ...tidePageBaseMapping({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
    url: 'path.url',
    summary: 'field_landing_page_summary',
    showInPageNav: 'field_show_table_of_content',
    inPageNavHeadingLevel: (src) => {
      if (src.field_node_display_headings === 'showH2AndH3') {
        return 'h3'
      }
      return 'h2'
    },
    header: {
      title: 'title',
      summary: 'field_landing_page_intro_text'
    },
    breadcrumbs: (src: string) => {
      return {
        items: [
          { label: 'Home', url: '/' },
          {
            label: getField(src, 'publication_navigation_root.meta.title'),
            url: getField(src, 'publication_navigation_root.meta.url')
          },
          { label: getField(src, 'title') }
        ]
      }
    },
    showLastUpdated: () => true
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false,
      withSidebarSocialShare: false
    }),
  ]
}

export default tide<%= h.changeCase.pascalCase(name) %>Module
