export const rplDescriptionListVariants = ['default', 'compact'] as const
export type RplDescriptionListVariant =
  (typeof rplDescriptionListVariants)[number]

export interface IRplDescriptionListItem {
  term: string
  description?: string
  url?: string
  [key: string]: unknown
}

export interface RplDescriptionListProps {
  inline?: boolean
  block?: boolean
  items?: IRplDescriptionListItem[]
  variant?: RplDescriptionListVariant
}
