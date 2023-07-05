<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import RplButton from '../button/RplButton.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

const emit = defineEmits<{
  (e: 'switchTab', payload: rplEventPayload & { action: 'select' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-tabs', emit)

const RplTabsModes = ['horizontal', 'vertical']

interface IRplTab {
  title: string
  key: string
  icon?: string | undefined
}

interface Props {
  tabs: Array<IRplTab>
  activeTab?: string | undefined
  mode?: (typeof RplTabsModes)[number]
}

const props = withDefaults(defineProps<Props>(), {
  activeTab: undefined,
  mode: 'horizontal'
})

const state = reactive({
  active: ''
})

onMounted(() => {
  state.active =
    state.active === '' ? props.activeTab || props.tabs[0].key : state.active
})

const componentClasses = computed(() => [
  'rpl-tabs',
  props.mode === 'vertical' ? 'rpl-tabs--vertical' : null
])

const activeClasses = (key: string) => [
  'rpl-tab',
  state.active === key ? 'rpl-tab--active' : null
]

const updateActive = (key: string) => {
  state.active = key

  emitRplEvent(
    'switchTab',
    {
      action: 'select',
      text: props.tabs.find((tab) => tab.key === key)?.title
    },
    { global: true }
  )
}
</script>

<template>
  <div :class="componentClasses">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="activeClasses(item.key)"
    >
      <RplButton
        :icon-name="item.icon ? `icon-${item.icon}` : null"
        variant="transparent"
        @click="updateActive(item.key)"
        >{{ item.title }}</RplButton
      >
    </div>
  </div>
</template>

<style src="./RplTabs.css"></style>
