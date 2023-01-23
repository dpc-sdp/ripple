<script setup lang="ts">
import RplDataTableRow from './RplDataTableRow.vue'

interface HeadingType {
  horizontal: boolean
  vertical: boolean
}

interface Props {
  header?: string
  footer?: string
  headingItems: Array<string>
  headingType?: HeadingType
  hiddenItems: Array<string>
  items: Array<Array<string>>
  offset: number
}

withDefaults(defineProps<Props>(), {
  header: '',
  footer: '',
  headingType: () => ({
    horizontal: true,
    vertical: false
  }),
  offset: 1
})
</script>

<template>
  <div class="rpl-table rpl-data-table">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table>
        <caption v-if="header">
          {{
            header
          }}
        </caption>
        <thead>
          <tr>
            <th v-for="(item, index) in headingItems" :key="index">
              {{ item }}
            </th>
            <th class="rpl-data-table__actions"></th>
          </tr>
        </thead>
        <RplDataTableRow
          v-for="(row, index) in items"
          :key="index"
          :items="row"
          :content="hiddenItems[index]"
          :vertical-header="headingType.vertical"
          :offset="offset"
        ></RplDataTableRow>
        <tfoot v-if="footer">
          <tr>
            <td :colspan="headingItems.length">{{ footer }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style src="./data-table.css" />
