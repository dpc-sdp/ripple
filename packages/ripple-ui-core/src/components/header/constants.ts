import { RplListItemArray } from '../list/constants'

export const RplHeaderThemes = ['default', 'reverse', 'neutral'] as const

export interface CoreLink {
  text: string
  url: string
}

export interface ContextLink extends CoreLink {
  title?: string
}

export interface Links {
  title?: string
  items: RplListItemArray[]
  more?: CoreLink
}

export type RplGraphicPlacement = 'top' | 'bottom'
