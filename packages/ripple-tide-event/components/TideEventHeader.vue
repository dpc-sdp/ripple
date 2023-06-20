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
import type { TideEventHeader } from '../types'

interface Props {
  header: TideEventHeader
  hasBreadcrumbs: boolean
}

defineProps<Props>()
</script>
