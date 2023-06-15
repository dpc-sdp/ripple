<script setup lang="ts">
const props = defineProps<{
  items: Array<any>
}>()
</script>

<template>
  <RplMediaGallery :items="items" />
</template>
