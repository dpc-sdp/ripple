<script setup lang="ts">
interface Props {
  hasSidebar: boolean
}
withDefaults(defineProps<Props>(), {
  hasSidebar: false
})
</script>

<template>
  <div
    :class="{
      'rpl-layout-card-grid': true,
      'rpl-layout-card-grid--has-sidebar': hasSidebar
    }"
  >
    <slot></slot>
  </div>
</template>

<style src="./RplCardGrid.css" />
