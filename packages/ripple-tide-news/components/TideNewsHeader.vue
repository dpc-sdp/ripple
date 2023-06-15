<script lang="ts">
export default { name: 'TideNewsHeader' }
</script>

<template>
  <RplHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    {{ header.summary }}
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { TideNewsHeader } from '../types'

defineProps<{
  header: TideNewsHeader
  hasBreadcrumbs: boolean
}>()
</script>
