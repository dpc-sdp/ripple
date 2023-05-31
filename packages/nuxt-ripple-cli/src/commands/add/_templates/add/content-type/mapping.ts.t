---
to: mapping/index.ts
---
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'

const tide<%= h.changeCase.pascalCase(name) %>Module: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping(),
    url: 'path.url'
  },
  includes: [
    ...tidePageBaseIncludes()
  ]
}

export default tide<%= h.changeCase.pascalCase(name) %>Module
