<script setup lang="ts">
import { computed } from 'vue'
import RplButton from '../button/RplButton.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

const emit = defineEmits<{
  (e: 'toggleTab', payload: rplEventPayload & { action: 'select' }): void
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

const componentClasses = computed(() => [
  'rpl-tabs',
  props.mode === 'vertical' ? 'rpl-tabs--vertical' : null
])

const activeClasses = (key: string) => [
  'rpl-tab',
  props.activeTab === key ? 'rpl-tab--active' : null
]

const updateActive = (key: string) => {
  emitRplEvent(
    'toggleTab',
    {
      action: 'select',
      id: key,
      key,
      text: props.tabs.find((tab) => tab.key === key)?.title
    },
    { global: true }
  )
}

// This component only renders the tablist, panels are the responsibility of the
// consuming component - naming is opinionated to match the ARIA spec
</script>

<template>
  <div :class="componentClasses" role="tablist">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="activeClasses(item.key)"
    >
      <RplButton
        :id="`tab-${item.key}`"
        :icon-name="item.icon ? `icon-${item.icon}` : null"
        :aria-selected="activeTab === item.key ? 'true' : null"
        :aria-controls="`panel-${item.key}`"
        role="tab"
        variant="transparent"
        @click="updateActive(item.key)"
        >{{ item.title }}</RplButton
      >
    </div>
  </div>
</template>

<style src="./RplTabs.css"></style>
