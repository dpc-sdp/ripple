import { RplCardItem } from '../card/constants'
import { RplImageType } from '../image/constants'

export interface RplCardCarouselMeta {
  topic?: string
  date?: string
  dateStart?: string
  dateEnd?: string
}

export interface RplCardCarouselItem {
  type?: 'promo' | 'keydates'
  title: string
  url: string
  image: RplImageType
  summary: string
  meta?: RplCardCarouselMeta
  keyDates?: RplCardItem[]
}
