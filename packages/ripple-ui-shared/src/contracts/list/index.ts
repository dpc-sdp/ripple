export interface IRplListItemArray {
  id?: string
  text: string
  icon?: string
  iconColour?: string
  url?: string
  active?: boolean
  type?: string
  items?: IRplListItemArray[]
}

export const rplListTypes = ['ul', 'ol'] as const
export type RplListType = (typeof rplListTypes)[number]

export const rplIconPlacements = ['before', 'after'] as const
export type RplIconPlacement = (typeof rplIconPlacements)[number]

export interface RplListProps {
  items?: IRplListItemArray[]
  type?: RplListType
  itemClass?: string | Record<string, boolean>
  containerClass?: string | Record<string, boolean>
  depth?: number
  maxDepth?: number | null
  iconPlacement?: RplIconPlacement
  withLinkIds?: boolean
}
