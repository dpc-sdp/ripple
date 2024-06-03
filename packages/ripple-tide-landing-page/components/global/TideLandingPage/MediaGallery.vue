<script setup lang="ts">
defineProps<{
  id: string
  items: Array<any>
  hasSidebar?: boolean
  hasTitle?: boolean
  pageBackground?: string
}>()
</script>

<template>
  <RplMediaGallery :id="id" :items="items" />
</template>
