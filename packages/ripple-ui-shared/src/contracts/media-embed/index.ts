export type RplMediaEmbedType = string
export type RplMediaEmbedVariant = string
export type RplMediaEmbedSize = string

export interface RplMediaEmbedImage {
  src: string
  alt?: string
}

export interface RplMediaEmbedProps {
  type: RplMediaEmbedType
  variant?: RplMediaEmbedVariant
  size?: RplMediaEmbedSize
  title: string
  src: string
  image?: RplMediaEmbedImage
  showTitle?: boolean
  transcriptUrl?: string
  caption?: string
  sourceCaption?: string
  allowFullscreen?: boolean
  fullscreenLabel?: string
  dataContent?: string
  dataLabel?: string
  downloadUrl?: string
  downloadLabel?: string
  background?: boolean
}
