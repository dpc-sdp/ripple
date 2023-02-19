import type { IRplCardItem } from '../card/constants'
import { RplImageType } from '../image/constants'

export interface IRplCardCarouselMeta {
  topic?: string
  date?: string
  dateStart?: string
  dateEnd?: string
}

export interface IRplCardCarouselItem {
  type?: 'promo' | 'keydates'
  title: string
  url: string
  image: RplImageType
  summary: string
  meta?: IRplCardCarouselMeta
  keyDates?: IRplCardItem[]
}
