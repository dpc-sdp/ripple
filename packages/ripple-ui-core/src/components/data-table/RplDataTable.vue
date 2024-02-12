<script setup lang="ts">
import RplDataTableRow, {
  extraRowContent,
  tableColumnConfig,
  tableRow
} from './RplDataTableRow.vue'

interface HeadingType {
  horizontal: boolean
  vertical: boolean
}

interface Props {
  caption?: string
  footer?: string
  columns: tableColumnConfig[]
  items: tableRow[]
  showExtraContent?: boolean
  headingType?: HeadingType
  offset?: number
}

withDefaults(defineProps<Props>(), {
  caption: '',
  footer: '',
  headingType: () => ({
    horizontal: true,
    vertical: false
  }),
  offset: 1,
  showExtraContent: false,
  items: () => []
})
</script>

<template>
  <div class="rpl-table rpl-data-table">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table>
        <caption v-if="caption">
          {{
            caption
          }}
        </caption>
        <thead v-if="headingType.horizontal && columns.length > 0">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :class="column.classes"
            >
              {{ column.label }}
            </th>
            <th v-if="showExtraContent" class="rpl-data-table__actions">
              <span class="rpl-u-visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <RplDataTableRow
          v-for="(row, index) in items"
          :key="row.id || index"
          :columns="columns"
          :row="row"
          :extraContent="(row.__extraContent as extraRowContent) || null"
          :showExtraContent="showExtraContent"
          :vertical-header="headingType.vertical"
          :offset="offset"
          :caption="caption"
          :index="index"
        ></RplDataTableRow>
        <tfoot v-if="footer">
          <tr>
            <td :colspan="columns.length">{{ footer }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style src="./RplDataTable.css" />
