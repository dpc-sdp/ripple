import type { IRplImageType } from '../image'
import type { RplLinkReference } from '../link'

export const rplHeaderThemes = ['default', 'reverse', 'neutral'] as const
export type RplHeaderTheme = (typeof rplHeaderThemes)[number]

export interface IRplHeaderLinkExtended extends RplLinkReference {
  title?: string
}

export interface IRplHeaderLinksList {
  title?: string
  items: IRplHeaderLinkExtended[]
}

export interface RplHeroHeaderProps {
  theme?: RplHeaderTheme
  title: string
  logo?: IRplImageType | IRplImageType[]
  background?: IRplImageType
  cornerTop?: string | boolean
  cornerBottom?: string | boolean
  primaryAction?: RplLinkReference
  secondaryAction?: IRplHeaderLinkExtended
  links?: IRplHeaderLinksList
  breadcrumbs?: boolean
  behindNav?: boolean
  fullWidth?: boolean
}
