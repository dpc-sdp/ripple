<template>
  <div
    :class="{
      'rpl-map-side-panel': true,
      'rpl-map-side-panel--right': panelLocation === 'right'
    }"
    :style="`--local-map-side-panel-height: ${mapHeight}px`"
  >
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
</template>

<script setup lang="ts">
interface Props {
  el?: string
  mapHeight: number
  panelLocation?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  el: 'ul',
  panelLocation: 'left'
})
</script>

<style src="./RplMapSidePanel.css"></style>
