<script setup lang="ts">
import { computed, reactive } from 'vue'
import RplButton from '../button/button.vue'

interface Props {
  content: string
  items: Array<string>
  verticalHeader?: boolean
  offset: number
}

withDefaults(defineProps<Props>(), {
  content: '',
  items: () => [],
  verticalHeader: true,
  offset: 1
})

const state = reactive({
  enabled: false
})

const rowClasses = computed(() => [
  'rpl-data-table__row',
  state.enabled ? 'rpl-data-table__row--open' : null
])
</script>

<template>
  <tbody :class="rowClasses">
    <tr>
      <component
        :is="index === 0 && verticalHeader ? 'th' : 'td'"
        v-for="(item, index) of items"
        :key="index"
        >{{ item }}</component
      >
      <td class="rpl-data-table__actions">
        <RplButton
          class="rpl-data-table__toggle"
          variant="transparent"
          :icon-name="state.enabled ? 'icon-chevron-up' : 'icon-chevron-down'"
          @click="state.enabled = !state.enabled"
          >{{ state.enabled ? 'Less' : 'More' }} info</RplButton
        >
      </td>
    </tr>
    <tr v-if="state.enabled" ref="r1" class="rpl-data-table__details">
      <td v-if="offset > 0" :colspan="offset"></td>
      <td :colspan="items.length + 1 - offset">{{ content }}</td>
    </tr>
  </tbody>
</template>
