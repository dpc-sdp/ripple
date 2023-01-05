<template>
  <RplHeaderHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeaderHeroHeader>
</template>

<script setup lang="ts">
import type { TideGrantHeader } from '../types'

defineProps<{
  header: TideGrantHeader
  hasBreadcrumbs: boolean
}>()
</script>
