<template>
  <div
    class="rpl-map-side-panel"
    :class="{ 'rpl-map-side-panel--right': panelLocation === 'right' }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  panelLocation?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  panelLocation: 'left'
})
</script>

<style src="./RplMapSidePanel.css"></style>
