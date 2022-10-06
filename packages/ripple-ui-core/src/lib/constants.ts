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
