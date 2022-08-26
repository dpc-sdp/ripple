<script lang="ts"> export default { name: 'RplRelatedLinks' }</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplRelatedLinksVariants } from './constants'
defineProps({
  variant: {
    type: String as PropType<typeof RplRelatedLinksVariants[number]>,
    default: RplRelatedLinksVariants[0]
  }
})
</script>

<template>
  <div :class="`rpl-related-links rpl-related-links--${variant}`">
    TODO: RplRelatedLinks functionality
  </div>
</template>

<style src="./related-links.css" />
