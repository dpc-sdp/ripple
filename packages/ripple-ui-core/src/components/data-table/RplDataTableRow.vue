<script setup lang="ts">
import { computed, reactive } from 'vue'
import RplButton from '../button/RplButton.vue'
import RplContent from '../content/RplContent.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

export type tableColumnConfig = {
  label: string
  objectKey?: string
  classes?: string
  component?: string
  props?: any
  isHTML?: boolean
}

export type tableRow = {
  id?: string
  [key: string]: any
}

export type extraRowContentItem = {
  heading: string
  content?: string
  objectKey?: string
  component?: string
}

export type extraRowContent = {
  component?: string
  html?: string
  items?: extraRowContentItem[]
}

interface Props {
  columns: tableColumnConfig[]
  row: tableRow
  extraContent?: extraRowContent
  verticalHeader?: boolean
  offset: number
  caption?: string
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  verticalHeader: true,
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
  enabled: false
})

const rowClasses = computed(() => [
  'rpl-data-table__row',
  state.enabled ? 'rpl-data-table__row--open' : null,
  ...(props.columns[props.index]?.classes || [])
])

const toggleLabel = computed(() => (state.enabled ? 'Less info' : 'More info'))

const handleClick = () => {
  emitRplEvent(
    'expandRow',
    {
      action: !state.enabled ? 'open' : 'close',
      text: toggleLabel.value,
      label: getCellText(0),
      name: props.caption,
      index: props.index + 1
    },
    { global: true }
  )

  state.enabled = !state.enabled
}

const hasComponent = (column: any) =>
  typeof column === 'object' && column.hasOwnProperty('component')

const getCellText = (col?: number | string, value = '') => {
  if (typeof col === 'undefined') return value

  const objectKey = typeof col === 'string' ? col : props.columns[col].objectKey

  return typeof props.row === 'object' && props.row.hasOwnProperty(objectKey)
    ? props.row[objectKey]
    : value
}
</script>

<template>
  <tbody :class="rowClasses">
    <tr>
      <component
        :is="i === 0 && verticalHeader ? 'th' : 'td'"
        v-for="(column, i) of columns"
        :key="i"
        :data-label="column.label"
      >
        <template v-if="hasComponent(column)">
          <component
            :is="(column as tableColumnConfig).component"
            :item="row"
            :column="column"
          />
        </template>
        <template v-else>
          <div v-if="column.isHTML" v-html="getCellText(i)" />
          <template v-else>
            {{ getCellText(i) }}
          </template>
        </template>
      </component>
      <td v-if="extraContent" class="rpl-data-table__actions">
        <RplButton
          class="rpl-data-table__toggle"
          variant="transparent"
          :icon-name="state.enabled ? 'icon-chevron-up' : 'icon-chevron-down'"
          @click="handleClick"
          >{{ toggleLabel }}</RplButton
        >
      </td>
    </tr>
    <tr v-if="extraContent" ref="r1" class="rpl-data-table__details">
      <td v-if="offset > 0" :colspan="offset"></td>
      <td :colspan="columns.length + 1 - offset">
        <template v-if="hasComponent(extraContent)">
          <component
            :is="extraContent.component"
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
            <p>
              <strong>{{ item.heading }}</strong>
            </p>
            <template v-if="hasComponent(item)">
              <component :is="item.component" :item="row" :column="item" />
            </template>
            <p v-else>{{ getCellText(item?.objectKey, item.content) }}</p>
          </div>
        </template>
        <RplContent
          v-if="extraContent.html"
          :html="extraContent.html"
          class="rpl-data-table__details-content"
        />
      </td>
    </tr>
  </tbody>
</template>
