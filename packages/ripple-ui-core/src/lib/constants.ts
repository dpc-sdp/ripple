export const RplColorThemes = [
  'default',
  'white',
  'text',
  'information',
  'success',
  'warning',
  'error',
  'inactive'
] as const

export interface RplLink {
  text: string
  url: string
}

export interface RplLinkExtended extends RplLink {
  description: string
}

export type RplDateRange = {
  from: string | number
  to: string | number
}
