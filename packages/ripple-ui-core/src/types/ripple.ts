export type RplTheme = 'core' | 'accent' | 'neutral'
export type RplIconSizes = 's' | 'm' | 'l'

export interface RplImageType {
  src: string
  width: number
  height: number
  alt: string
  focalPoint: {
    x: number
    y: number
  }
}
