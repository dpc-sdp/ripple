<script lang="ts">
export default { name: 'TideEventHeader' }
</script>

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
import type { TideEventHeader } from '../types'

interface Props {
  header: TideEventHeader
  hasBreadcrumbs: boolean
}

defineProps<Props>()
</script>
