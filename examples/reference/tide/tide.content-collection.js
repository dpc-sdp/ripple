import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'

export default class CustomContentCollection extends ContentCollection {
  // eslint-disable-next-line no-useless-constructor
  constructor (configuration, searchEndpoint, environment) {
    super(configuration, searchEndpoint, environment)
    console.log('custom constructor')
  }
  // override methods here to change contentcollection behaviour
}
