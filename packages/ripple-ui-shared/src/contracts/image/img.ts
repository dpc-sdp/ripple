export interface RplImgProps {
  class: string
  src: string
  alt?: string
  width?: number
  height?: number
  srcset?: string
  sizes?: unknown
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'auto' | 'high' | 'low'
  style?: unknown
}
