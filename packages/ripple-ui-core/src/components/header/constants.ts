import { RplListItemArray } from '../list/constants'
import { RplLink } from '../../lib/constants'

export const RplHeaderThemes = ['default', 'reverse', 'neutral'] as const

export interface RplHeaderLinkExtended extends RplLink {
  title?: string
}

export interface RplHeaderLinksList {
  title?: string
  items: RplListItemArray[]
  more?: RplLink
}

export type RplHeaderGraphicPlacement = 'top' | 'bottom'
