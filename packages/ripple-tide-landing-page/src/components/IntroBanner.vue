<template>
  <RplIntroHeader :title="title"></RplIntroHeader>
</template>
<script setup lang="ts">
import { RplIntroHeader } from '@dpc-sdp/ripple-ui-core'
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
