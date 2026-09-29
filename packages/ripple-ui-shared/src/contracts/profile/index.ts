import type { IRplDescriptionListItem } from '../description-list'
import type { IRplImageType } from '../image'

export interface RplProfileProps {
  image: IRplImageType
  items?: IRplDescriptionListItem[]
}
