import type { IRplImageType } from '../image'

export type RplFooterVariant = string

export interface ICoreLink {
  text: string
  url: string
}

export interface ILogoLink {
  image: IRplImageType | string
  url: string
  text?: string
}

export interface INavSectionItem {
  title: string
  items?: ICoreLink[]
}

export interface RplFooterProps {
  variant?: RplFooterVariant
  nav?: INavSectionItem[]
  links?: ICoreLink[]
  logos?: ILogoLink[]
  credit?: string
  acknowledgement?: string
}
