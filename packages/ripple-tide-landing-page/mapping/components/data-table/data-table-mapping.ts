import { getField } from '@dpc-sdp/ripple-tide-api'
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
  }>
  items: Array<Record<string, any>>
}

const columnKey = (index: number) => `col${index}`

const getColumnsFromEntries = (rows: any, firstRowIsHeader: boolean) => {
  const firstRow = rows && rows.hasOwnProperty('0') ? rows['0'] : null

  if (!firstRow) {
    return []
  }

  return firstRow.map((val: any, index: number) => {
    return {
      label: firstRowIsHeader ? val : undefined,
      objectKey: columnKey(index)
    }
  })
}

export const dataTableMapping = (
  field
): TideDynamicPageComponent<ITideDataTable> => {
  const entries = getField(field, 'field_data_table_content.value', {})

  const items = Object.keys(entries)
    .filter((entryKey) => entryKey !== 'caption')
    .filter((entryKey, i) => {
      if (field?.field_first_row_table_header) {
        // Exclude first row if it is a header
        return entryKey !== '0'
      }

      return true
    })
    .map((entryKey) => {
      const entry = entries[entryKey]

      return entry.reduce((itemObj, val, index) => {
        return {
          ...itemObj,
          [columnKey(index)]: val
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

export const dataTableIncludes = []

export default {
  includes: dataTableIncludes,
  mapping: dataTableMapping,
  contentTypes: ['landing_page']
}
