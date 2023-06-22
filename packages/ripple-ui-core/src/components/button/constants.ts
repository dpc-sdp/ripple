export const RplButtonElements = ['button', 'a'] as const
export const RplButtonVariants = [
  'filled',
  'outlined',
  'white',
  'transparent',
  'elevated',
  'destructive',
  'none'
] as const
export const RplButtonIconPositions = ['left', 'right'] as const
export const RplButtonThemes = ['default', 'neutral'] as const

export default {
  RplButtonElements,
  RplButtonVariants,
  RplButtonIconPositions,
  RplButtonThemes
}
