import { requestMapping, responseMapping, defaultMapping } from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/tide.search-template'

module.exports = {
  cards: {
    requestMapping,
    responseMapping: {
      ...responseMapping,
      'fv_recommendation': {
        ...defaultMapping,
        tag: () => 'Recommendation'
      }
    }
  }
}
