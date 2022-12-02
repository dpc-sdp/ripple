import { query as newsQuery, mapping as newsMapping } from './news-mapping.js'
import {
  query as eventQuery,
  mapping as eventMapping
} from './event-mapping.js'
import { mapping as customMapping } from './custom-mapping.js'

// import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
//
// export interface ITideCardCarousel {
//   items: Array<{
//     title: string
//     caption: string | null
//     alt: string | null
//     thumbnail: string
//     image: string
//   }>
// }

const getCardsFromType = async (field: any, tidePageApi): Promise<any> => {
  let items = []

  switch (field.field_paragraph_latest_items) {
    case 'news': {
      const news = await tidePageApi.getContentList('news', newsQuery)

      items = (news || []).map(newsMapping)
      break
    }
    case 'event': {
      const events = await tidePageApi.getContentList('event', eventQuery)

      items = (events || []).map(eventMapping)
      break
    }
    default:
      items = field.field_paragraph_items.map(customMapping)
      break
  }

  return items
}

export const cardCarouselMapping = async (
  field,
  page,
  tidePageApi
): Promise<any> => {
  return {
    component: 'TideLandingPageCardCarousel',
    id: field.drupal_internal__id.toString(),
    title: field.field_paragraph_title,
    props: {
      items: await getCardsFromType(field, tidePageApi)
    }
  }
}

export const cardCarouselIncludes = [
  'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image'
]
