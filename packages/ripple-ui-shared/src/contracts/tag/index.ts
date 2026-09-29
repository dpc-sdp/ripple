export const rplTagVariants = ['default', 'neutral', 'dark'] as const
export type RplTagVariant = (typeof rplTagVariants)[number]

export interface RplTagProps {
  variant?: RplTagVariant
  label?: string
}
