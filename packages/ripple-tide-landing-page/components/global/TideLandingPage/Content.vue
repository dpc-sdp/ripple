<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <RplContent :html="html" />
</template>
