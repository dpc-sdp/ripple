<script lang="ts">
export default { name: 'TideMediaHeader' }
</script>

<template>
  <RplHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  />
</template>

<script setup lang="ts">
import type { TideMediaHeader } from '../../types'

defineProps<{
  header: TideMediaHeader
  hasBreadcrumbs: boolean
}>()
</script>
