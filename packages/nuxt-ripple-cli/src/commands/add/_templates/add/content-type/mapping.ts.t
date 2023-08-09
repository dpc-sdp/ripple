---
to: mapping/index.ts
---
import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  getImageFromField,
  getBodyFromField,
  getField
} from '@dpc-sdp/ripple-tide-api'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'

const tide<%= h.pascalCaseMerge(name) %>Module: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping(),
    // TODO: the below mapping is an example only, add your mapping here
    header: {
      title: 'title',
      summary: 'field_landing_page_intro_text'
    },
    body: {
      image: (src) =>
        getImageFromField(src, 'field_featured_image.field_media_image'),
      caption: (src) =>
        getField(src, 'field_featured_image.field_media_caption'),
      content: (src) => getBodyFromField(src, 'body')
    }
  },
  includes: [
    ...tidePageBaseIncludes(),
    // TODO: the below is an example only, add your includes here
    'field_featured_image',
    'field_featured_image.field_media_image'
  ]
}

export default tide<%= h.pascalCaseMerge(name) %>Module
