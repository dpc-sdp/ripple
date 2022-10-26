<script lang="ts">
export default { name: 'TideMediaHeader' }
</script>

<template>
  <RplHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="true"
    :title="header.title"
  >
    <RplContent
      v-if="header.summary"
      :html="header.summary"
      class="rpl-type-p-large"
    />
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { TideMediaHeader } from '../../types'
import { RplHeroHeader } from '@dpc-sdp/ripple-ui-core'
import { RplContent } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  header: TideMediaHeader
}>()
</script>
