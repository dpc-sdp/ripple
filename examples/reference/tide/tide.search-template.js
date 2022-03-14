import { requestMapping, responseMapping, defaultMapping, profileMapping } from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/tide.search-template'

module.exports = {
  cards: {
    requestMapping,
    responseMapping: {
      ...responseMapping,
      'fv_recommendation': {
        ...defaultMapping,
        tag: () => 'Recommendation'
      },
      'aboriginal_honour_roll': {
        ...defaultMapping,
        ...profileMapping
      },
      'sr_profile': {
        ...defaultMapping,
        ...profileMapping
      },
      'vada_profile': {
        ...defaultMapping,
        ...profileMapping
      },
      'vdrp_profile': {
        ...defaultMapping,
        ...profileMapping
      }
    }
  }
}
