import { getField, getBody } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideDataTable {
  orientation: 'row' | 'column'
  caption: string
  headingType: {
    horizontal: boolean
    vertical: boolean
  }
  columns: Array<{
    label?: string
    objectKey: string
    isHTML?: boolean
  }>
  items: Array<Record<string, any>>
}

const columnKey = (index: number) => `col${index}`

const getColumnsFromEntries = (rows: any, firstRowIsHeader: boolean) => {
  const firstRow = rows && rows.hasOwnProperty('0') ? rows['0'] : null

  if (!firstRow) {
    return []
  }

  // Drop weight key pair from firstRow
  if (firstRow.hasOwnProperty('weight')) {
    delete firstRow.weight
  }

  // D10 API returns an object, legacy returns an array
  return (Array.isArray(firstRow) ? firstRow : Object.values(firstRow)).map(
    (val: any, index: number) => {
      return {
        label: firstRowIsHeader ? val : undefined,
        objectKey: columnKey(index),
        isHTML: true
      }
    }
  )
}

export const dataTableMappingLegacy = (
  field: any
): TideDynamicPageComponent<ITideDataTable> => {
  const entries = getField(field, 'field_data_table_content.value', {})

  const items = Object.keys(entries)
    .filter((entryKey) => entryKey !== 'caption')
    .filter((entryKey) => {
      if (field?.field_first_row_table_header) {
        // Exclude first row if it is a header
        return entryKey !== '0'
      }

      return true
    })
    .map((entryKey) => {
      return entries[entryKey].reduce((itemObj: any, val: any, index: any) => {
        return {
          ...itemObj,
          [columnKey(index)]: getBody(val)
        }
      }, {})
    })

  const columns = getColumnsFromEntries(
    entries,
    field?.field_first_row_table_header || false
  )

  return {
    component: 'TideLandingPageDataTable',
    id: `${field.drupal_internal__id}`,
    props: {
      caption: field?.field_data_table_content?.caption,
      headingType: {
        horizontal: field?.field_first_row_table_header,
        vertical: field?.field_first_column_table_header
      },
      orientation: field?.field_table_orientation ? 'row' : 'column',
      columns,
      items
    }
  }
}

export const dataTableMapping = (
  field: any
): TideDynamicPageComponent<ITideDataTable> => {
  const sorted = Object.values(
    getField(field, 'field_data_table_content.value', {})
  )
    .filter((e: any) => e.weight)
    .sort((a: any, b: any) => a.weight - b.weight)

  const items = Object.keys(sorted)
    .filter((entryKey) => {
      if (field?.field_first_row_table_header) {
        // Exclude first row if it is a header
        return entryKey !== '0'
      }

      return true
    })
    .map((entryKey) => {
      const unprocessed: any = sorted[entryKey as any]
      delete unprocessed.weight
      const row: any = {}
      for (const [key, value] of Object.entries(unprocessed)) {
        row[columnKey(parseInt(key)) as any] = value
      }
      return row
    })

  const columns = getColumnsFromEntries(
    sorted,
    field?.field_first_row_table_header || false
  )

  return {
    component: 'TideLandingPageDataTable',
    id: `${field.drupal_internal__id}`,
    props: {
      caption: field?.field_data_table_content?.caption,
      headingType: {
        horizontal: field?.field_first_row_table_header,
        vertical: field?.field_first_column_table_header
      },
      orientation: field?.field_table_orientation ? 'row' : 'column',
      columns,
      items
    }
  }
}

export const dataTableIncludes = []

// D10 API returns an object, legacy returns an array
export const selectDataTableMapping = (
  field: any
): TideDynamicPageComponent<ITideDataTable> => {
  const raw = getField(field, 'field_data_table_content.value', {})

  if (Array.isArray(raw[0])) {
    return dataTableMappingLegacy(field)
  } else {
    // D10
    return dataTableMapping(field)
  }
}

export default {
  includes: dataTableIncludes,
  mapping: selectDataTableMapping,
  contentTypes: ['landing_page']
}
