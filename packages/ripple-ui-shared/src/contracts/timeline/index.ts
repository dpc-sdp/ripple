import type { IRplImageType } from '../image'

export interface IRplTimelineItem {
  image?: IRplImageType
  title?: string
  subtitle?: string
  dateStart?: string
  dateEnd?: string
  current?: boolean
  description?: string
  url?: string
}

export interface RplTimelineProps {
  title?: string | null
  items?: IRplTimelineItem[]
}
