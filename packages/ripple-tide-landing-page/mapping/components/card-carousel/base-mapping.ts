import {
  getField,
  getImageFromField,
  getPlainTextFromField
} from '@dpc-sdp/ripple-tide-api'
import { ITideCardCarouselItem } from './card-carousel-mapping'

export const baseIncludes = [
  'field_featured_image',
  'field_featured_image.field_media_image'
]

export const baseMapping = (field): ITideCardCarouselItem => ({
  title: getField(field, 'title', ''),
  url: getField(field, 'path.url', ''),
  image: getImageFromField(field, 'field_featured_image.field_media_image'),
  meta: {
    topic: getField(field, 'field_topic.name', null)
  },
  summary: getPlainTextFromField(field, 'field_landing_page_summary', '')
})
