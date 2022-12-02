import { RplCardItem } from '../card/constants'

export interface RplCardCarouselMeta {
  tag?: string
  date?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface RplCardCarouselItem {
  type?: 'promo' | 'keydates'
  title: string
  url: string
  image: string
  summary: string
  meta?: RplCardCarouselMeta
  keyDates?: RplCardItem
}
