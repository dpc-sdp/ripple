import type { RplLinkReference } from '../link'

export interface RplLinkExtended extends RplLinkReference {
  title?: string
}

export interface RplPageLinksProps {
  prev?: RplLinkExtended
  next?: RplLinkExtended
}
