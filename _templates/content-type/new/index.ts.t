---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.ts
---

import { tidePageMappingBase } from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tide<%= h.changeCase.pascalCase(name) %>Module: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>/component',
  schema: '@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>/types',
  mapping: {
    ...tidePageMappingBase,
    summary: 'field_landing_page_summary',
  },
  includes: [
  ]
}

export default tide<%= h.changeCase.pascalCase(name) %>Module
