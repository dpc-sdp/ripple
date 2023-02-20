import { IRplListItemArray } from '../list/constants'
import { RplLink } from '../../lib/constants'

export const RplHeaderThemes = ['default', 'reverse', 'neutral'] as const

export interface IRplHeaderLinkExtended extends RplLink {
  title?: string
}

export interface IRplHeaderLinksList {
  title?: string
  items: IRplListItemArray[]
  more?: RplLink
}

export type RplHeaderGraphicPlacement = 'top' | 'bottom'
