---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.vue
---

<template>
  <div>
    <h1>{{ page.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import type Tide<%= h.changeCase.pascalCase(name) %>Page from './../types'

defineProps<{
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}>()
</script>
