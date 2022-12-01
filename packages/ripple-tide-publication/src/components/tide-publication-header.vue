<script lang="ts">
export default { name: 'TidePublicationHeader' }
</script>

<template>
  <RplHeaderHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="true"
    :title="header.title"
  >
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeaderHeroHeader>
</template>

<script setup lang="ts">
import type { TidePublicationHeader } from '../types'

interface Props {
  header: TidePublicationHeader
}

defineProps<Props>()
</script>
