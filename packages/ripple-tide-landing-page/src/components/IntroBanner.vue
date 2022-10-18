<script setup lang="ts">
import { RplIntroHeader } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  title: string
}>()
</script>

<template>
  <RplIntroHeader :title="title"></RplIntroHeader>
</template>
