export const RplImagePriority = ['auto', 'low', 'high'] as const

export const RplImageFit = ['none', 'contain', 'cover'] as const

export interface RplImageFocalPoint {
  x: number
  y: number
}

type RplImageAspectOptions = 'square' | 'full' | 'wide' | 'ultrawide' | 'panorama'

interface RplImageAspectBreakpoints {
  xs?: RplImageAspectOptions
  s?: RplImageAspectOptions
  m?: RplImageAspectOptions
  l?: RplImageAspectOptions
  xl?: RplImageAspectOptions
}

export type RplImageAspect = RplImageAspectBreakpoints | RplImageAspectOptions
