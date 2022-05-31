import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'

export default class CustomContentCollection extends ContentCollection {
  constructor (configuration, searchEndpoint, environment) {
    super(configuration, searchEndpoint, environment)
    console.log('Running custom content collection constructor')
  }

  // Overrides the default and adds custom to the start
  getTitle () {
    return this.config.title
  }

  getSimpleDSLSort (state) {
    const contentTypes = this.getSimpleDSLContentTypes()
    // sort news content type by the news item date
    if (contentTypes.type.includes('news')) {
      return [{ field_news_date: 'desc' }, { created: 'desc' }]
    }
    // All other items sorted by created date
    return [{ created: 'desc' }]
  }
}
