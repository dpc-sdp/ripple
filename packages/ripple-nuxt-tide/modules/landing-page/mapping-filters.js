// Filters for adding extra process on a mapping value
import { logger } from './../../lib/core'

// Create more filters if need.
module.exports = {
  accordionContent: (accordions) => {
    let rtn = []
    accordions.forEach(item => {
      rtn.push({
        title: item.field_paragraph_accordion_name,
        content: item.field_paragraph_accordion_body.processed
      })
    })
    return rtn
  },

  paragraphKeydates: (fieldParagraphKeydates) => {
    return fieldParagraphKeydates.map((item) => {
      return {
        // The Tide field is plain text.
        // Do we need date field for this?
        date: item.field_paragraph_keydate,
        title: item.field_paragraph_title,
        description: item.field_paragraph_summary
      }
    })
  },

  autoCardLink: (card) => {
    if (card.field_paragraph_reference) {
      if (card.field_paragraph_reference.path) {
        return {
          text: card.field_paragraph_cta_text,
          url: card.field_paragraph_reference.path.url
        }
      }
    }
    return null
  },

  cardAutoImage: (card) => {
    const getCardImage = (mediaImage) => ({
      src: mediaImage.url,
      focalPoint: mediaImage.meta.focal_point,
      width: mediaImage.meta.width,
      height: mediaImage.meta.height
    })
    if (card.field_featured_image) {
      return card.field_featured_image.field_media_image ? getCardImage(card.field_featured_image.field_media_image) : null
    } else {
      return card.field_media_image ? getCardImage(card.field_media_image) : null
    }
  },

  autoCardSummary: (card, { mapping }) => {
    return mapping.parseField([
      ['body', 'summary'],
      ['field_landing_page_summary']
    ], card)
  },

  autoCardTopic: (card) => {
    const display = card.field_paragraph_display_topic
    if (card.field_paragraph_reference && display) {
      if (card.field_paragraph_reference.field_topic) {
        return card.field_paragraph_reference.field_topic.name
      }
    }
    return null
  },

  paragraphCtaImage: (fieldParagraphCtaImage) => {
    let image

    if (fieldParagraphCtaImage === null) {
      // CTA image field is optional in Tide, so it may be null
      image = null
    } else {
      image = {
        src: fieldParagraphCtaImage.field_media_image.url || fieldParagraphCtaImage.field_media_image.uri,
        alt: fieldParagraphCtaImage.field_media_image.meta.alt
      }
    }

    return image
  },

  galleryContent: (gallery) => {
    let galleryImages = []

    gallery.forEach(item => {
      galleryImages.push({
        thumbnail: item.field_media_image.url || item.field_media_image.uri,
        alt: item.field_media_image.meta.alt || '',
        image: item.field_media_image.url || item.field_media_image.uri,
        title: item.name,
        caption: item.field_media_caption || ''
      })
    })

    return galleryImages
  },

  cardCarousel: async (carousel, { mapping }) => {
    let cards = []
    switch (carousel.field_paragraph_latest_items) {
      case null:
        const items = carousel.field_paragraph_items
        items.map(async item => {
          try {
            // Use await here won't block any process as card mapping is not requiring any Tide requests
            const card = await mapping.get(item, 'landingPageComponents')
            cards.push(card)
          } catch (error) {
            if (process.server) {
              logger.error('Failed to get card for carousel.', { error, label: 'Landing page' })
            }
          }
        })

        break
      case 'news':
        // TODO: handle this hook code in better way
        if (typeof mapping.mappingFilters.latestNewsCards === 'function') {
          try {
            const fetcher = require('@dpc-sdp/ripple-nuxt-tide/modules/news/mapping-fetchers').latestNewsCards
            const latestNewsCardList = await mapping.fetch(fetcher)
            cards = await mapping.filter(latestNewsCardList, ['latestNewsCards'])
          } catch (error) {
            if (process.server) {
              logger.error('Failed to get news card for carousel.', { error, label: 'Landing page' })
            }
          }
        }
        break
      case 'event':
        // TODO: handle this hook code in better way
        if (typeof mapping.mappingFilters.eventLatestEvents === 'function') {
          try {
            const { getCardCarouselEvents } = require('@dpc-sdp/ripple-nuxt-tide/modules/event/helpers')
            cards = await getCardCarouselEvents(mapping)
          } catch (error) {
            if (process.server) {
              logger.error('Failed to get event card for carousel.', { error, label: 'Landing page' })
            }
          }
        }
        break
    }
    return cards
  },

  timelineList: (list, { mapping }) => {
    return list.map(item => {
      const dateRange = mapping.parseField(['field_paragraph_date_range'], item)
      return {
        image: mapping.parseField(['field_paragraph_media', 'field_media_image', 'url'], item),
        title: mapping.parseField(['field_paragraph_title'], item),
        subtitle: mapping.parseField(['field_paragraph_cta_text'], item),
        url: item.field_paragraph_link ? item.field_paragraph_link.url || item.field_paragraph_link.uri : null,
        dateStart: dateRange ? dateRange.value : null,
        dateEnd: dateRange ? dateRange.end_value : null,
        description: mapping.parseField(['field_paragraph_body', 'processed'], item)
      }
    })
  },

  embeddedSearchPlaceholder: (search) => {
    const contentType = search.field_paragraph_search_block
    if (contentType === 'custom') {
      return search.field_paragraph_search_ph
    } else if (contentType === 'none') {
      return 'Search all'
    } else if (contentType.endsWith('s')) {
      return `Search all ${contentType}`
    } else {
      return `Search all ${contentType}s`
    }
  },

  embeddedSearchTheme: (search) => {
    return 'solid'
  },

  introBannerLinkTypes: (type) => {
    switch (type) {
      case 'buttons':
        return 'button'

      case 'featured_links':
      default:
        return 'link'
    }
  },

  introBannerTypeToIcon: (type) => {
    switch (type) {
      case 'with_icon':
        return 'alert_information'

      default:
        return null
    }
  },

  dataTableStructure: (data) => {
    if (typeof data !== 'object' || !Object.values(data).length) return []
    // remove caption value from object
    if (data.hasOwnProperty('caption')) {
      delete data.caption
    }

    return Object.values(data)
  }

}
