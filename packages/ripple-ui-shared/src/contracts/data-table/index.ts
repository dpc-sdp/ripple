export interface HeadingType {
  horizontal: boolean
  vertical: boolean
}

export interface TableColumnConfig {
  label: string
  objectKey?: string
  classes?: string | string[]
  component?: string
  props?: Record<string, unknown>
  isHTML?: boolean
  isLabelHTML?: boolean
}

export interface TableRow {
  id?: string
  [key: string]: unknown
}

export interface RplDataTableProps {
  caption?: string
  footer?: string
  columns: TableColumnConfig[]
  items?: TableRow[]
  showExtraContent?: boolean
  headingType?: HeadingType
  offset?: number
  hasSidebar?: boolean
  orientation?: 'row' | 'column'
}
