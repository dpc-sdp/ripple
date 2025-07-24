<script setup lang="ts">
import { computed } from 'vue'
import RplDataTableCell from './RplDataTableCell.vue'
import type { HeadingType, tableColumnConfig, tableRow } from './types'

type RplDataTableColumnOrientedRows = {
  column: tableColumnConfig
  items: {
    data: tableRow
    column: tableColumnConfig
    label: string
    index: number
  }[]
}

interface Props {
  items: tableRow[]
  columns: tableColumnConfig[]
  headingType: HeadingType
}

const props = defineProps<Props>()

// Re-maps items so data is instead grouped by column instead of row, for example,
// Row 1 Col 1 heading - becomes - Row 1 Col 1 heading
// - Row 2 Col 1 value ----------- - Row 2 Col 1 value
// Row 1 Col 2 heading ----------- - Row 3 Col 1 value
// - Row 2 Col 2 value
const columnOriented = computed((): RplDataTableColumnOrientedRows[] => {
  const vertical = props.headingType.vertical

  return (
    Object.keys(props.items?.[0] || [])
      // remove the first column if it's a vertical header
      .filter((_, i) => !(vertical && i === 0))
      .map((_, i) => {
        // index, taking removed vertical header into account
        const index = vertical ? i + 1 : i
        return {
          column: props.columns[index],
          items: props.items.map((item) => {
            const [key, val] = Object.entries(item)[index]
            return {
              index,
              data: { [key]: val },
              column: props.columns[index],
              label: vertical ? Object.values(item)[0] : null
            }
          })
        }
      })
  )
})
</script>

<template>
  <tbody
    v-for="(row, index) in columnOriented"
    :key="`cor-${index}`"
    :class="`rpl-data-table__row rpl-data-table__row--${(index + 1) % 2 === 0 ? 'even' : 'odd'}`"
  >
    <tr>
      <th v-if="headingType.horizontal" scope="row">
        <span v-if="row.column.isLabelHTML" v-html="row.column.label" />
        <span v-else>{{ row.column.label }}</span>
      </th>
      <td v-for="(item, i) in row.items" :key="`coi-${i}`">
        <div v-if="headingType.vertical" class="rpl-data-table__mobile-label">
          <span v-if="item.column.isHTML" v-html="item.label" />
          <span v-else>{{ item.label }}</span>
        </div>
        <RplDataTableCell
          :columns="columns"
          :row="item.data"
          :column="item.column"
          :i="item.index"
        />
      </td>
    </tr>
  </tbody>
</template>
