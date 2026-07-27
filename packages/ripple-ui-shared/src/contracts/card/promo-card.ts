import type { IRplImageType } from '../image'
import type { RplCardElement } from './card'

export interface RplPromoCardProps {
  el?: RplCardElement
  highlight?: boolean
  image?: IRplImageType
  title: string
  url?: string
}
