import type { IRplImageType } from '../image'
import type { RplCardElement } from './card'

export interface RplAvatarCardProps {
  el?: RplCardElement
  image: IRplImageType
  title: string
  url?: string
}
