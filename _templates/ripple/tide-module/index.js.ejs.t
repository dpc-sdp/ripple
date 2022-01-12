---
to: packages/<%= name %>/index.js
---

import { getLandingPageComponents } from '@dpc-sdp/ripple-tide-api/src/services/utils'
import componentMapping from './component-mapping'
import components from './component-loader'

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/<%= name %>/index.vue'),
  components,
  mapping: {
    title: 'title',
    bodyComponents: async function (src) { return await getLandingPageComponents(src, 'field_landing_page_component', componentMapping, this) }
  },
  includes: [
  ]
}
