import type { tableColumnConfig, tableRow } from './types'

export const hasComponent = (column: any) =>
  typeof column === 'object' && column.hasOwnProperty('component')

export const getCellText = (
  col: number | string | undefined,
  value: string | null | undefined,
  columns?: tableColumnConfig[],
  row?: tableRow
) => {
  if (typeof col === 'undefined') return value

  const objectKey = typeof col === 'string' ? col : columns[col]?.objectKey

  return typeof row === 'object' && row.hasOwnProperty(objectKey)
    ? row[objectKey]
    : value
}
