import { tidePageMappingBase } from '@dpc-sdp/ripple-tide-api'
import type { RplTideMapping } from '@dpc-sdp/ripple-tide-api/types'

const tideLandingPageModule: RplTideMapping = {
  component: '@dpc-sdp/ripple-tide-landing-page/component',
  schema: '@dpc-sdp/ripple-tide-landing-page/types',
  mapping: {
    ...tidePageMappingBase,
    summary: 'field_landing_page_summary',
  },
  includes: [
  ]
}

export default tideLandingPageModule
