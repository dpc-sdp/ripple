---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.vue
---

<script lang="ts">
export default { name: 'Tide<%= h.changeCase.pascalCase(name) %>Page' }
</script>

<template>
  <RplLayout :background="page.background">
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody>
      <Tide<%= h.changeCase.pascalCase(name) %>Header :header="page.header"></Tide<%= h.changeCase.pascalCase(name) %>Header>
    </template>
    <template #body>

    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import type Tide<%= h.changeCase.pascalCase(name) %>Page from './../types'
import { RplLayout } from '@dpc-sdp/ripple-ui-core'

interface Props {
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}

defineProps<Props>()
</script>
