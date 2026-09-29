export interface IRplImageFocalPoint {
  x: number
  y: number
}

export const rplImageAspectOptions = [
  'square',
  'full',
  'wide',
  'ultrawide',
  'panorama',
  'portrait'
] as const
export type RplImageAspectOption = (typeof rplImageAspectOptions)[number]

export type RplImageAspectBreakpoints = Partial<
  Record<'xs' | 's' | 'm' | 'l' | 'xl', RplImageAspectOption>
>

export type RplImageAspect = RplImageAspectOption | RplImageAspectBreakpoints

export const rplImageFits = ['none', 'contain', 'cover'] as const
export type RplImageFit = (typeof rplImageFits)[number]

export const rplImagePriorities = ['auto', 'low', 'high'] as const
export type RplImagePriority = (typeof rplImagePriorities)[number]

export interface IRplImageType {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  sizes?: string
  srcSet?: string
  focalPoint?: IRplImageFocalPoint
  aspect?: RplImageAspect
  fit?: RplImageFit
  priority?: RplImagePriority
}

export interface RplImageProps {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  sizes?: string
  srcSet?: string
  circle?: boolean
  focalPoint?: IRplImageFocalPoint
  aspect?: RplImageAspect
  fit?: RplImageFit
  priority?: RplImagePriority
}
