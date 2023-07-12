---
to: components/Tide<%= h.pascalCaseMerge(name) %>Header.vue
---
<template>
  <RplHeroHeader
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    {{ header.summary }}
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { Tide<%= h.pascalCaseMerge(name) %>Header } from '../types'

interface Props {
  header: Tide<%= h.pascalCaseMerge(name) %>Header
  hasBreadcrumbs: boolean
}

defineProps<Props>()
</script>
