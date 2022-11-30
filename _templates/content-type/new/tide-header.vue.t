---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/components/tide-<%= h.changeCase.paramCase(name) %>-header.vue
---

<script lang="ts">
export default { name: 'Tide<%= h.changeCase.pascalCase(name) %>Header' }
</script>

<template>
  <RplHeroHeader
    :corner-top="true"
    :corner-bottom="true"
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { Tide<%= h.changeCase.pascalCase(name) %>Header } from '../../types'
import { RplHeroHeader } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  hasBreadcrumbs: boolean
  header: Tide<%= h.changeCase.pascalCase(name) %>Header
}>()
</script>
