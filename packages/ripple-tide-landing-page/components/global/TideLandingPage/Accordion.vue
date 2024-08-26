<script setup lang="ts">
defineProps<{
  id: string
  title?: string
  description?: string
  numbered: boolean
  items: Array<any>
  hasSidebar?: boolean
  hasTitle?: boolean
  pageBackground?: string
}>()
</script>

<template>
  <RplContent
    v-if="description"
    :html="description"
    class="tide-accordion-description rpl-u-margin-b-4"
  />
  <RplAccordion :id="id" :items="items" :numbered="numbered" :title="title" />
</template>
