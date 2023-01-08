<script setup lang="ts">
import { RplMediaGallery } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  id: string
  title: string
  items: Array<any>
}>()
</script>

<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>
  <RplMediaGallery :id="id" :items="items" />
</template>
