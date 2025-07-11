<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { computed, type ComputedRef, ref, unref, onMounted } from 'vue'
import { bpMin } from '../../lib/breakpoints'
import RplDataTableRow, { extraRowContent } from './RplDataTableRow.vue'
import RplDataTableColumnOriented from './RplDataTableColumnOriented.vue'
import type { tableColumnConfig, tableRow, HeadingType } from './types'

interface Props {
  caption?: string
  footer?: string
  columns: tableColumnConfig[]
  items: tableRow[]
  showExtraContent?: boolean
  headingType?: HeadingType
  offset?: number
  hasSidebar?: boolean
  orientation?: 'row' | 'column'
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  footer: '',
  headingType: () => ({
    horizontal: true,
    vertical: false
  }),
  offset: 1,
  showExtraContent: false,
  items: () => [],
  hasSidebar: false,
  orientation: 'row'
})

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const breakpoints = useBreakpoints(bpMin)
const isUpToMediumScreen = breakpoints.smaller('m')
const isUpToLargeScreen = breakpoints.smaller('l')

const displayMobileView: ComputedRef<boolean> = computed(() => {
  if (!isMounted.value) {
    return false
  }

  return props.hasSidebar ? unref(isUpToLargeScreen) : unref(isUpToMediumScreen)
})
</script>

<template>
  <div
    :class="{
      'rpl-table': true,
      'rpl-data-table': true,
      'rpl-data-table--mobile': displayMobileView
    }"
  >
    <div
      class="rpl-table__scroll-container rpl-u-focusable-outline--visible"
      tabindex="0"
    >
      <table>
        <caption v-if="caption">
          {{
            caption
          }}
        </caption>
        <thead v-if="headingType.horizontal && columns.length > 0">
          <tr>
            <template v-for="(column, index) in columns" :key="index">
              <th
                v-if="column.isLabelHTML"
                :class="column.classes"
                scope="col"
                v-html="column.label"
              ></th>
              <th v-else :class="column.classes" scope="col">
                {{ column.label }}
              </th>
            </template>
            <th v-if="showExtraContent" class="rpl-data-table__actions">
              <span class="rpl-u-visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <template v-if="displayMobileView && props.orientation === 'column'">
          <RplDataTableColumnOriented
            :items="items"
            :columns="columns"
            :heading-type="headingType"
          />
        </template>
        <template v-else>
          <RplDataTableRow
            v-for="(row, index) in items"
            :key="row.id || index"
            :columns="columns"
            :row="row"
            :extraContent="(row.__extraContent as extraRowContent) || null"
            :showExtraContent="showExtraContent"
            :vertical-header="headingType.vertical"
            :horizontal-header="headingType.horizontal"
            :offset="offset"
            :caption="caption"
            :index="index"
          />
        </template>
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
