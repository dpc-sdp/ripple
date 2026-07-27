export type RplMediaEmbedTypes = 'image' | 'video'

export type RplMediaEmbedVariants =
  | 'landscape'
  | 'portrait'
  | 'square'
  | 'complex'

export type RplMediaEmbedSizes = 'small' | 'medium' | 'large'

export interface RplMediaEmbedImage {
  alt?: string
  width?: number
  height?: number
}
