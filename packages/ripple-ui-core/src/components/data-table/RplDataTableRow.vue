<script setup lang="ts">
import { computed, reactive } from 'vue'
import RplButton from '../button/RplButton.vue'
import RplContent from '../content/RplContent.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  content: any
  columns: Array<string>
  items: Array<string>
  verticalHeader?: boolean
  offset: number
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  items: () => [],
  verticalHeader: true,
  offset: 1
})

const emit = defineEmits<{
  (
    e: 'toggleRow',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-data-table', emit)

const state = reactive({
  enabled: false
})

const rowClasses = computed(() => [
  'rpl-data-table__row',
  state.enabled ? 'rpl-data-table__row--open' : null
])

const structuredContent = computed(() => Array.isArray(props.content))
const toggleLabel = computed(() => (state.enabled ? 'Less info' : 'More info'))

const handleClick = () => {
  emitRplEvent(
    'toggleRow',
    {
      action: !state.enabled ? 'open' : 'close',
      text: toggleLabel.value,
      label: props.items[0],
      index: props.index + 1
    },
    { global: true }
  )

  state.enabled = !state.enabled
}
</script>

<template>
  <tbody :class="rowClasses">
    <tr>
      <component
        :is="i === 0 && verticalHeader ? 'th' : 'td'"
        v-for="(item, i) of items"
        :key="i"
        :data-label="columns[i]"
        >{{ item }}</component
      >
      <td v-if="content" class="rpl-data-table__actions">
        <RplButton
          class="rpl-data-table__toggle"
          variant="transparent"
          :icon-name="state.enabled ? 'icon-chevron-up' : 'icon-chevron-down'"
          @click="handleClick"
          >{{ toggleLabel }}</RplButton
        >
      </td>
    </tr>
    <tr v-if="content" ref="r1" class="rpl-data-table__details">
      <td v-if="offset > 0" :colspan="offset"></td>
      <td :colspan="items.length + 1 - offset">
        <template v-if="structuredContent">
          <div
            v-for="(item, i) of content[0].items"
            :key="i"
            class="rpl-data-table__details-content"
          >
            <p>
              <strong>{{ item.heading }}</strong>
            </p>
            <p>{{ item.content }}</p>
          </div>
        </template>
        <RplContent
          v-else
          :html="content"
          class="rpl-data-table__details-content"
        ></RplContent>
      </td>
    </tr>
  </tbody>
</template>
