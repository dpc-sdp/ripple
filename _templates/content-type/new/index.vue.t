---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/index.vue
---

<script lang="ts">
export default { name: 'Tide<%= h.changeCase.pascalCase(name) %>Page' }
</script>

<template>
  <TideBaseLayout
    :site="site"
    :background="page.background"
    :pageTitle="page.title"
    :pageDescription="page.description"
    :pageLanguage="page.lang"
    :topicTags="[]"
    :updatedDate="page.changed || page.created"
  >
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <Tide<%= h.changeCase.pascalCase(name) %>Header :header="page.header" :hasBreadcrumbs="hasBreadcrumbs"></Tide<%= h.changeCase.pascalCase(name) %>Header>
    </template>
    <template #body="{ hasSidebar }">

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
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type Tide<%= h.changeCase.pascalCase(name) %>Page from './../types'
import Tide<%= h.changeCase.pascalCase(name) %>Header from './components/tide-<%= h.changeCase.paramCase(name) %>-header.vue'

interface Props {
  site: TideSiteData
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}

defineProps<Props>()
</script>
