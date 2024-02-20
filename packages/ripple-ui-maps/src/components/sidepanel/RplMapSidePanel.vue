<template>
  <div
    :class="{
      'rpl-map-side-panel': true,
      'rpl-map-side-panel--open': isOpen,
      'rpl-map-side-panel--right': panelLocation === 'right'
    }"
    :style="`--local-map-side-panel-height: ${mapHeight}px`"
  >
    <div class="rpl-map-side-panel__wrapper">
      <div v-if="$slots.aboveItems" class="rpl-map-side-panel__above-items">
        <slot name="aboveItems"></slot>
      </div>
      <component :is="el" class="rpl-map-side-panel__items">
        <slot></slot>
      </component>
      <div v-if="$slots.belowItems" class="rpl-map-side-panel__below-items">
        <slot name="belowItems"></slot>
      </div>
    </div>
    <RplButton
      v-if="showToggle"
      variant="none"
      class="rpl-map-side-panel__toggle"
      aria-label="Toggle side panel"
      @click="toggleSidePanel"
    >
      <RplIcon name="icon-chevron-right" />
    </RplButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RplButton, RplIcon } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  el?: string
  mapHeight: number
  showToggle: boolean
  panelLocation?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  el: 'ul',
  panelLocation: 'left',
  showToggle: true
})

const isOpen = ref(true)

const toggleSidePanel = () => (isOpen.value = !isOpen.value)
</script>

<style src="./RplMapSidePanel.css"></style>
