import ContentCollection from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/lib/content-collection'

export default class CustomContentCollection extends ContentCollection {
  // eslint-disable-next-line no-useless-constructor
  constructor (configuration, searchEndpoint, environment) {
    super(configuration, searchEndpoint, environment)
  }

  // Overrides the default and adds custom to the start
  getTitle () {
    return this.config.title
  }

  getSimpleDSLSort (state) {
    if (state.q && state.q.length > 0) {
      return []
    }
    const contentTypes = this.getSimpleDSLContentTypes()
    // sort news content type by the news item date
    if (contentTypes.type.includes('news')) {
      return [{ field_news_date: 'desc' }, { created: 'desc' }]
    }
    // All other items sorted by created date
    return [{ created: 'desc' }]
  }
}
