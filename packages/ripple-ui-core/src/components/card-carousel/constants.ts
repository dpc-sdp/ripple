import { RplCardItem } from '../card/constants'

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
  image: string
  summary: string
  meta?: RplCardCarouselMeta
  keyDates?: RplCardItem[]
}
