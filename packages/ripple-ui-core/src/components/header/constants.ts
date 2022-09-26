import { RplListItemArray } from '../list/constants'

export const RplHeaderThemes = ['default', 'reverse'] as const

export interface CoreLink {
  text: string,
  url: string,
}

export interface Links {
  title?: string,
  items: RplListItemArray[],
  more?: CoreLink
}
