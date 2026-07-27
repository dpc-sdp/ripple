export const rplStatsGridVariants = ['onLight', 'onDark'] as const
export type RplStatsGridVariant = (typeof rplStatsGridVariants)[number]

export interface RplStatsGridProps {
  variant?: RplStatsGridVariant
}

export interface RplStatsGridItemProps {
  value: string
}
