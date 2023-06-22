<script setup lang="ts">
import RplDataTableRow from './RplDataTableRow.vue'

interface HeadingType {
  horizontal: boolean
  vertical: boolean
}

interface Props {
  caption?: string
  footer?: string
  columns: Array<string>
  headingType?: HeadingType
  items: Array<Array<string>>
  offset: number
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  footer: '',
  headingType: () => ({
    horizontal: true,
    vertical: false
  }),
  offset: 1
})

// Split hidden content out for presentation component
let hiddenItems: Array<any> = [],
  rowItems: Array<Array<string>> = []

props.items.map((j) => {
  let row: Array<string> = []

  j.map((k) => {
    if (Array.isArray(k)) {
      hiddenItems.push(k)
    } else {
      row.push(k)
    }
  })

  rowItems.push(row)
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
        <thead>
          <tr>
            <th v-for="(item, index) in columns" :key="index">
              {{ item }}
            </th>
            <th v-if="hiddenItems.length" class="rpl-data-table__actions">
              <span class="rpl-u-visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <RplDataTableRow
          v-for="(row, index) in rowItems"
          :key="index"
          :columns="columns"
          :items="row"
          :content="hiddenItems?.[index]?.[0]"
          :vertical-header="headingType.vertical"
          :offset="offset"
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
