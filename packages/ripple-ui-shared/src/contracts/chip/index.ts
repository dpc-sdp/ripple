export const rplChipVariants = ['default', 'reverse'] as const
export type RplChipVariant = (typeof rplChipVariants)[number]

export interface RplChipProps {
  variant?: RplChipVariant
  label?: string
  url?: string
  index?: number
}
