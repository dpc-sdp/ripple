// Filters for adding extra process on a mapping value

// Create more filters if need.
module.exports = {
  featuredNews: (featured, { mapping }) => {
    return featured.map((item) => ({
      image: mapping.parseField(['field_featured_image', 'field_media_image', 'url'], item),
      date: mapping.parseField(['field_news_date'], item),
      topic: mapping.parseField(['field_topic', 'name'], item),
      title: item.title,
      summary: mapping.filter(item, ['autoCardSummary']),
      link: {
        url: item.path.alias
      }
    }))
  },

  newsListing: async (paragraphNewsListing, { mapping }) => {
    const topics = paragraphNewsListing.reduce((result, item) => {
      if (item.type === 'taxonomy_term--topic') {
        result.push(item.drupal_internal__tid)
      }
      return result
    }, [])
    const tags = paragraphNewsListing.reduce((result, item) => {
      if (item.type === 'taxonomy_term--tags') {
        result.push(item.drupal_internal__tid)
      }
      return result
    }, [])
    const getNewsListFetcher = require('@dpc-sdp/ripple-nuxt-tide/modules/news/mapping-fetchers').getNewsList(topics, tags)

    try {
      const lists = await mapping.fetch(getNewsListFetcher)

      if (lists instanceof Error) {
        throw lists
      }
      return lists.map(news => ({
        date: news.field_news_date,
        tag: news.field_topic.name,
        title: news.title,
        url: news.path.alias
      }))
    } catch (error) {
      const logger = require('@dpc-sdp/ripple-nuxt-tide/lib/core/logger').default
      logger.error('Failed in getting news listing.', { error, label: 'News' })
      return []
    }
  },

  latestNewsCards: (list, { mapping }) => {
    return list.map(item => ({
      name: 'rpl-card-promotion',
      data: {
        image: mapping.parseField(['field_featured_image', 'field_media_image', 'url'], item),
        date: mapping.parseField(['field_news_date'], item),
        topic: mapping.parseField(['field_topic', 'name'], item),
        title: item.title,
        summary: mapping.filter(item, ['autoCardSummary']),
        link: {
          text: 'Read more',
          url: item.path.alias
        }
      }
    }))
  }
}
