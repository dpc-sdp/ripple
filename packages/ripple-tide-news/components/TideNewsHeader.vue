<script lang="ts">
export default { name: 'TideNewsHeader' }
</script>

<template>
  <RplHeaderHeroHeader :corner-top="true" :corner-bottom="true" :behind-nav="true" :breadcrumbs="hasBreadcrumbs"
    :title="header.title">
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeaderHeroHeader>
</template>

<script setup lang="ts">
import type { TideNewsHeader } from '../types'

defineProps<{
  header: TideNewsHeader
  hasBreadcrumbs: boolean
}>()
</script>
