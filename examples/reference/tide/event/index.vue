<template>
  <h1>{{ page.title }}</h1>
</template>

<script setup lang="ts">
const props =
  defineProps<{
    page: {
      title: string
    }
  }>()
</script>
