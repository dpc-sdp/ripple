<script setup lang="ts">
import { computed, reactive } from 'vue'
import RplButton from '../button/RplButton.vue'
import RplContent from '../content/RplContent.vue'

interface Props {
  content: any
  columns: Array<string>
  items: Array<string>
  verticalHeader?: boolean
  offset: number
}

const props = withDefaults(defineProps<Props>(), {
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

const structuredContent = computed(() => Array.isArray(props.content))
</script>

<template>
  <tbody :class="rowClasses">
    <tr>
      <component
        :is="index === 0 && verticalHeader ? 'th' : 'td'"
        v-for="(item, index) of items"
        :key="index"
        :data-label="columns[index]"
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
      <td :colspan="items.length + 1 - offset">
        <template v-if="structuredContent">
          <div
            v-for="(item, index) of content[0].items"
            :key="index"
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
