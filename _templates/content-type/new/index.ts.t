---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.ts
---

import {
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
      withSidebarRelatedLinks: false
    }),
    header: {
      title: 'title',
      summary: 'field_landing_page_intro_text'
    },
    summary: 'field_landing_page_summary',
  },
  includes: [
    ...tidePageBaseIncludes({
      withSidebarContacts: false,
      withSidebarRelatedLinks: false
    }),
  ]
}

export default tide<%= h.changeCase.pascalCase(name) %>Module
