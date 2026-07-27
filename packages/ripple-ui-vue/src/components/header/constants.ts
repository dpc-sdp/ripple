import { IRplListItemArray } from '../list/constants'
import { RplLinkReference } from '@dpc-sdp/ripple-ui-shared/contracts'

export const RplHeaderThemes = ['default', 'reverse', 'neutral'] as const

export interface IRplHeaderLinkExtended extends RplLinkReference {
  title?: string
}

export interface IRplHeaderLinksList {
  title?: string
  items: IRplListItemArray[]
  type?: 'link' | 'button'
  more?: RplLinkReference
}

export type RplHeaderGraphicPlacement = 'top' | 'bottom'
