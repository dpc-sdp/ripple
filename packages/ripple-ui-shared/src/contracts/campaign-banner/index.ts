import type { IRplImageType } from '../image'
import type { RplLinkReference } from '../link'

export interface RplPrimaryCampaignProps {
  title: string
  image?: IRplImageType
  link?: RplLinkReference
}

export interface RplSecondaryCampaignProps {
  title: string
  image?: IRplImageType
  link?: RplLinkReference
}
