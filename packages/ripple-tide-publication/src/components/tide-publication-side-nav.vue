<script lang="ts">
export default { name: 'TidePublicationSideNav' }
</script>

<template>
  <RplVerticalNav :title="title" :items="items"></RplVerticalNav>
</template>

<script setup lang="ts">
import { RplVerticalNav } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  title: any
  items: any
}>()
</script>
