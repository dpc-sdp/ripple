export const vicGovHomeUrl = 'https://vic.gov.au'
export const vicGovHomeLabel = 'Victoria government home'

export const RplFooterVariants = ['default', 'neutral'] as const

export interface NavSectionItem {
  text: string
  url?: string
  items?: {
    text: string
    url: string
    icon?: string
  }[]
}

export interface CoreLink {
  text: string
  url: string
}

export interface LogoLink {
  alt: string
  url: string
  src: string
}
