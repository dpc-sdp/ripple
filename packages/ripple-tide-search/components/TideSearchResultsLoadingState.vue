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
  opacity: 0.5;
  pointer-events: none;
}
</style>
