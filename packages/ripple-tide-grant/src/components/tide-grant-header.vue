<script lang="ts">
export default { name: 'TideGrantHeader' }
</script>

<template>
  <RplHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="true"
    :title="header.title"
  >
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { TideGrantHeader } from '../types'
import { RplHeroHeader } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  header: TideGrantHeader
}>()
</script>
