<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
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
  isHTML?: boolean
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
  'rpl-type-p',
  'rpl-u-focusable-block',
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
    <button
      v-for="(item, index) in tabs"
      :id="`tab-${item.key}`"
      :key="index"
      :class="activeClasses(item.key)"
      type="button"
      role="tab"
      :aria-selected="activeTab === item.key ? 'true' : undefined"
      :aria-controls="`panel-${item.key}`"
      @click="updateActive(item.key)"
    >
      <span v-html="item.title" />
      <RplIcon v-if="item.icon" :name="`icon-${item.icon}`" />
    </button>
  </div>
</template>

<style src="./RplTabs.css"></style>
