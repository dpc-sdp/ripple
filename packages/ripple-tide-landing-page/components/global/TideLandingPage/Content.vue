<script setup lang="ts">
import { RplContent } from '#components'

defineProps<{
  html: string
}>()
</script>

<template>
  <RplContent :html="html" />
</template>
