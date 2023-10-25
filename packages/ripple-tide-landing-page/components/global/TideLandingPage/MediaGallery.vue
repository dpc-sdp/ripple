<script setup lang="ts">
const props = defineProps<{
  id: string
  items: Array<any>
}>()
</script>

<template>
  <RplMediaGallery :id="id" :items="items" />
</template>
