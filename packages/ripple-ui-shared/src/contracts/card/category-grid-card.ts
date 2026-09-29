import type { IRplImageType } from '../image'
import type { RplCardElement } from './card'

export interface RplCategoryGridCardProps {
  el?: RplCardElement
  image?: IRplImageType
  title: string
  url?: string
}
