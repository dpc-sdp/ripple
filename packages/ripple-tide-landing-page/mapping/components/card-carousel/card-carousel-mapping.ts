import { query as newsQuery, mapping as newsMapping } from './news-mapping.js'
import {
  query as eventQuery,
  mapping as eventMapping
} from './event-mapping.js'
import { mapping as customMapping } from './custom-mapping.js'
import {
  TideImageField,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'

export interface ITideCardCarouselItemMeta {
  topic?: string | null
  date?: string | null
  dateStart?: string | null
  dateEnd?: string | null
}

interface TideCardCarouselImageField extends TideImageField {
  drupal_internal__target_id?: number | null
}

export interface ITideCardCarouselKeyDates {
  title?: string
  subtitle?: string
  content?: string
}

export interface ITideCardCarouselItem {
  type?: string
  title: string
  url: string
  caption?: string
  alt?: string
  thumbnail?: string | null
  image?: TideCardCarouselImageField | null
  summary?: string | null
  meta?: ITideCardCarouselItemMeta
  keyDates?: ITideCardCarouselKeyDates[]
}

export interface ITideCardCarousel {
  items: ITideCardCarouselItem[] | Array<null>
}

const getCardsFromType = async (
  field,
  tidePageApi
): Promise<Array<ITideCardCarouselItem> | Array<null>> => {
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
): Promise<TideDynamicPageComponent<ITideCardCarousel>> => {
  const items = await getCardsFromType(field, tidePageApi)
  return {
    component: 'TideLandingPageCardCarousel',
    id: field.drupal_internal__id.toString(),
    title: items.length > 0 ? field.field_paragraph_title : '',
    props: {
      items
    }
  }
}

export const cardCarouselIncludes = [
  'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
  'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
  'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
  'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
  'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
  'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image'
]

export default {
  includes: cardCarouselIncludes,
  mapping: cardCarouselMapping,
  contentTypes: ['landing_page']
}
