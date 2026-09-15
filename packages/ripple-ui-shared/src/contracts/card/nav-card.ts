import type { IRplImageType } from '../image'
import type { RplCardElement } from './card'

export interface RplNavCardProps {
  el?: RplCardElement
  highlight?: boolean
  image?: IRplImageType
  inset?: boolean
  title: string
  url?: string
}
