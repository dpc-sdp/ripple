import type { RplCardElement } from './card'

export interface IRplCardItem {
  title: string
  subtitle: string
  content: string
}

export interface RplKeyDatesCardProps {
  ctaTitle: string
  el?: RplCardElement
  items?: IRplCardItem[]
  title?: string
  url?: string
}
