<script lang="ts">
export default { name: 'TideGrantHeader' }
</script>

<template>
  <header class="tide-grant__header">
    <h1 class="tide-grant__title rpl-type-h1">{{ header.title }}</h1>
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </header>
</template>

<script setup lang="ts">
import type { TideGrantHeader } from '../../types'

defineProps<{
  header: TideGrantHeader
}>()
</script>

<style>
.tide-grant__header {
  border-bottom: 1px solid rgba(0 0 0 / 0.15);
  margin-bottom: var(--rpl-sp-14);
  padding-bottom: var(--rpl-sp-14);
}
.tide-grant__title {
  max-width: 600px;
}
</style>
