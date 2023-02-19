<script setup lang="ts">
import TextLink from 'ripple-ui-core/src/components/text-link/RplTextLink.vue'
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
