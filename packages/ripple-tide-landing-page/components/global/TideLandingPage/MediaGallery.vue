<script setup lang="ts">
defineProps<{
  id: string
  title: string
  items: Array<any>
}>()
</script>

<template>
  <RplMediaGallery :id="id" :items="items" />
</template>
