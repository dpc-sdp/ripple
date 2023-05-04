import { getField } from '@dpc-sdp/ripple-tide-api'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'

export interface ITideDataTable {
  orientation: 'row' | 'column'
  caption: string
  headingType: {
    horizontal: boolean
    vertical: boolean
  }
  columns: Array<string>
  items: Array<Array<string>>
}

export const dataTableMapping = (
  field
): TideDynamicPageComponent<ITideDataTable> => {
  const entries = getField(field, 'field_data_table_content.value', {})
  const items = Object.keys(entries)
    .map((entry) => (entry !== 'caption' ? entries[entry] : null))
    .filter(Boolean)

  if (field?.field_first_row_table_header && entries?.[0]) {
    items.shift()
  }

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
      columns: field?.field_first_row_table_header ? entries?.[0] : [],
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
