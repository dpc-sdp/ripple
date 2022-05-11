import { RplColorThemes } from './../../lib/constants'

export const RplButtonTypes = [
  'filled',
  'outlined',
  'white',
  'elevated'
] as const
export const RplButtonIconPositions = ['left', 'right'] as const
export const RplButtonThemes = [...RplColorThemes] as const
