import type { ButtonVariant } from '../button'
import type { IRplImageType } from '../image'
import type { RplCardElement } from './card'

export interface RplCallToActionCardProps {
  el?: RplCardElement
  image?: IRplImageType
  title: string
  url?: string
  ctaText?: string
  variant?: ButtonVariant
}
