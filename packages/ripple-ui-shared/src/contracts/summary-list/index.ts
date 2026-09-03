export interface RplSummaryListItem {
  id: string
  label: string
  value?: string
  action?: string
}

export interface RplSummaryListProps {
  title?: string
  displayAction?: boolean
  items?: RplSummaryListItem[]
}
