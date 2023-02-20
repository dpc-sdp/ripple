---
to: mapping/index.ts
---

import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/ripple-tide-api'

// Shared mapping between types
export const tide<%= h.changeCase.pascalCase(name) %>Mapping = {
  ...tidePageBaseMapping(),
  title: 'name'
}

export const tide<%= h.changeCase.pascalCase(name) %>Includes = tidePageBaseIncludes()

export default {
  mapping: tide<%= h.changeCase.pascalCase(name) %>Mapping,
  includes: tide<%= h.changeCase.pascalCase(name) %>Includes
}
