import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
import defaultConfig from '@dpc-sdp/ripple-tide-landing-page'
import componentMapping from './component-mapping'

export default {
  component: () => import('@dpc-sdp/ripple-tide-landing-page/index.vue'),
  ...defaultConfig,
  mapping: {
    ...defaultConfig,
    bodyComponents: async function (src) { return await utils.getLandingPageComponents(src, 'field_landing_page_component', componentMapping, this) }
  },
  includes: [
    ...defaultConfig.includes
  ]
}
