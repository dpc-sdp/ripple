import type { IRplImageType } from '../image'

export type RplSlidesPerView =
  | number
  | Partial<Record<'xs' | 's' | 'm' | 'l' | 'xl', number>>
  | undefined

export interface IRplCardCarouselItem {
  title?: string
  url?: string
  image?: IRplImageType
  content?: string
  [key: string]: unknown
}

export interface RplCardCarouselProps {
  perView?: RplSlidesPerView
  items?: IRplCardCarouselItem[]
  keyDatesTitle?: string
}
