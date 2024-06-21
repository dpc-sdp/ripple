<template>
  <div :class="{ 'tide-search-results--loading': isActive }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false
})
</script>

<style>
.tide-search-results--loading {
  pointer-events: none;
  cursor: progress;
}
</style>
