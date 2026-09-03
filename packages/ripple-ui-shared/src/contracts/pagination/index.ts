export const rplPaginationVariants = ['complex', 'simple'] as const
export type RplPaginationVariant = (typeof rplPaginationVariants)[number]

export interface RplPaginationProps {
  label?: string
  totalPages: number
  currentPage?: number
  surroundingPages?: number
  contentType?: string
  showTally?: boolean
  variant?: RplPaginationVariant
  prevLabel?: string
  nextLabel?: string
}
