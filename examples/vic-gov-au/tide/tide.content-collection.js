import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'

export default class CustomContentCollection extends ContentCollection {
  constructor (schema) {
    super(schema)
    console.log('Running custom content collection constructor')
  }

  // Overrides the default and adds custom to the start
  getTitle () {
    return 'CUSTOM: ' + this.config.title
  }
}
