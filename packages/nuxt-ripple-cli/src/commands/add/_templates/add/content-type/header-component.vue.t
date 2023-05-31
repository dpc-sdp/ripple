---
to: components/Tide<%= h.changeCase.pascalCase(name) %>Header.vue
---
<template>
  <RplHeroHeader
    :behind-nav="true"
    :breadcrumbs="hasBreadcrumbs"
    :title="header.title"
  >
    <p class="rpl-type-p-large">{{ header.summary }}</p>
  </RplHeroHeader>
</template>

<script setup lang="ts">
import type { Tide<%= h.changeCase.pascalCase(name) %>Header } from '../types'

interface Props {
  header: Tide<%= h.changeCase.pascalCase(name) %>Header
  hasBreadcrumbs: boolean
}

defineProps<Props>()
</script>
