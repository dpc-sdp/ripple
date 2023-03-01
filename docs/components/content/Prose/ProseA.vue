<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  blank: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <RplTextLink :url="href">
    <slot />
  </RplTextLink>
</template>
