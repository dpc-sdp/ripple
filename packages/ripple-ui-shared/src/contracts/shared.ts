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

export type RplDateRange = {
  from: string | number
  to: string | number
}

export const bpMin: RplBreakpoints = {
  xs: 0,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200
} as const

export type RplBreakpoints = {
  xs?: number
  s?: number
  m?: number
  l?: number
  xl?: number
}
