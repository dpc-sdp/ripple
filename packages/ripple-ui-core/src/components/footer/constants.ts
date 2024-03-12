export const vicGovHomeUrl = 'https://vic.gov.au'
export const vicGovHomeLabel = 'Victoria government home'

export const RplFooterVariants = ['default', 'neutral'] as const

export interface INavSectionItem {
  text: string
  url?: string
  single?: boolean
  items?: {
    text: string
    url: string
    icon?: string
  }[]
}

export interface ICoreLink {
  text: string
  url: string
}

export interface ILogoLink {
  alt: string
  url: string
  src: string
}
