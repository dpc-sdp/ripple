export const RplImagePriority = ['auto', 'low', 'high'] as const

export interface RplImageFocalPoint {
  x: number
  y: number
}

type RplImageAspectOptions = '1/1' | '4/3' | '16/9' | '21/9' | '3/1'

export interface RplImageAspect {
  xs?: RplImageAspectOptions
  s?: RplImageAspectOptions
  m?: RplImageAspectOptions
  l?: RplImageAspectOptions
  xl?: RplImageAspectOptions
}

export const RplImageAspectMap = {
  '1/1': 'square',
  '4/3': 'full',
  '16/9': 'wide',
  '21/9': 'ultrawide',
  '3/1': 'panorama'
}
