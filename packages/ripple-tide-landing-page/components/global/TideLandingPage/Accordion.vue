<script setup lang="ts">
defineProps<{
  id: string
  title?: string
  description?: string
  numbered: boolean
  items: Array<any>
}>()
</script>

<template>
  <RplContent v-if="description" :html="description" class="rpl-u-margin-b-4" />
  <RplAccordion :id="id" :items="items" :numbered="numbered" :title="title" />
</template>
