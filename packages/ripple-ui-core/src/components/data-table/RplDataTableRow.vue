<script setup lang="ts">
import { computed, reactive } from 'vue'
import RplContent from '../content/RplContent.vue'
import RplDataTableCell from './RplDataTableCell.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import RplIcon from '../icon/RplIcon.vue'
import { getCellText, hasComponent } from './helpers'
import type { tableColumnConfig, tableRow } from './types'

export type extraRowContentItem = {
  heading: string
  content?: string
  objectKey?: string
  component?: string
  props?: any
}

export type extraRowContent = {
  component?: string
  props?: string
  html?: string
  items?: extraRowContentItem[]
}

interface Props {
  columns: tableColumnConfig[]
  items?: Array<string>
  row: tableRow
  extraContent?: extraRowContent | null
  verticalHeader?: boolean
  horizontalHeader?: boolean
  offset: number
  caption?: string
  index: number
  showExtraContent: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  verticalHeader: true,
  horizontalHeader: true,
  caption: undefined,
  extraContent: null
})

const emit = defineEmits<{
  (
    e: 'expandRow',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-data-table', emit)

const state = reactive({
  enabled: false,
  opened: false
})

const rowClasses = computed(() => [
  'rpl-data-table__row',
  state.opened ? 'rpl-data-table__row--open' : null,
  (props.index + 1) % 2 === 0
    ? 'rpl-data-table__row--even'
    : 'rpl-data-table__row--odd'
])

const toggleLabel = computed(() => (state.enabled ? 'Less info' : 'More info'))

const handleClick = () => {
  emitRplEvent(
    'expandRow',
    {
      action: !state.enabled ? 'open' : 'close',
      text: toggleLabel.value,
      label: getCellText(0, null, props.columns, props.row),
      name: props.caption,
      index: props.index + 1
    },
    { global: true }
  )
  if (!state.enabled) {
    state.opened = true
  }
  state.enabled = !state.enabled
}

const handleClosed = () => (state.opened = false)
</script>

<template>
  <tbody :class="rowClasses">
    <tr>
      <component
        :is="i === 0 && verticalHeader ? 'th' : 'td'"
        v-for="(column, i) of columns"
        :key="i"
        :data-label="column.label"
        :scope="i === 0 && verticalHeader ? 'row' : null"
      >
        <div
          v-if="!(i === 0 && verticalHeader) && horizontalHeader"
          class="rpl-data-table__mobile-label"
          v-html="column.label"
        />
        <RplDataTableCell :columns :row :i :column />
      </component>
      <td v-if="showExtraContent" class="rpl-data-table__actions">
        <button
          v-if="extraContent"
          type="button"
          :class="{
            'rpl-data-table-toggle': true,
            'rpl-data-table-toggle--expanded': state.enabled,
            'rpl-u-focusable-inline': true,
            'rpl-type-p-small': true
          }"
          @click="handleClick"
        >
          {{ toggleLabel }}
          <RplIcon name="icon-chevron-down" size="xs" />
        </button>
      </td>
    </tr>
    <tr v-if="extraContent" ref="r1" class="rpl-data-table__details">
      <td v-if="offset > 0" :colspan="offset"></td>
      <td :colspan="columns.length + 1 - offset">
        <RplExpandable :expanded="state.enabled" @closed="handleClosed">
          <div
            :class="{
              'rpl-data-table__details-wrap': true,
              'rpl-data-table__details-wrap--offset': offset
            }"
          >
            <template v-if="hasComponent(extraContent)">
              <component
                :is="extraContent.component"
                v-bind="extraContent?.props"
                class="rpl-data-table__details-content"
                :item="row"
              />
            </template>
            <template v-if="(extraContent as extraRowContent).items">
              <div
                v-for="(item, i) of extraContent.items"
                :key="i"
                class="rpl-data-table__details-content"
              >
                <template v-if="hasComponent(item)">
                  <component
                    :is="item.component"
                    v-bind="item?.props"
                    :item="row"
                    :column="item"
                  />
                </template>
                <template v-else>
                  <p>
                    <strong>{{ item.heading }}</strong>
                  </p>
                  <p>
                    {{
                      getCellText(item?.objectKey, item.content, columns, row)
                    }}
                  </p>
                </template>
              </div>
            </template>
            <RplContent
              v-if="extraContent.html"
              :html="extraContent.html"
              class="rpl-data-table__details-content"
            />
          </div>
        </RplExpandable>
      </td>
    </tr>
  </tbody>
</template>
