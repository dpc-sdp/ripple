export type RplSkeletonWidth = 'xs' | 's' | 'm' | 'l' | 'full'
export type RplSkeletonEffect = 'stripe' | 'fade'

export interface RplSkeletonProps {
  width?: RplSkeletonWidth
  effect?: RplSkeletonEffect
}
