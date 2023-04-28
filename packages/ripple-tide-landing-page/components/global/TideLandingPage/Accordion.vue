<script setup lang="ts">
defineProps<{
  id: string
  numbered: boolean
  items: Array<any>
}>()
</script>

<template>
  <RplAccordion :id="id" :items="items" :numbered="numbered" />
</template>
