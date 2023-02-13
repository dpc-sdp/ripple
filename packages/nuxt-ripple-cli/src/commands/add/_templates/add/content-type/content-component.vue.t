---
to: components/global/Tide<%= h.changeCase.pascalCase(name) %>Page.ts
---
<template>
  <TideBaseLayout :site="site" :pageTitle="page.title" :pageDescription="page.description" :pageLanguage="page.lang"
    :updatedDate="page.changed || page.created">
    <template #aboveHeader>
    </template>
    <template #primaryNav>
    </template>
    <template #breadcrumbs>
    </template>
    <template #aboveBody>
    </template>
    <template #body>
    </template>
    <template #sidebar>
    </template>
    <template #footer>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type { Tide<%= h.changeCase.pascalCase(name) %>Page } from '../../types'

interface Props {
  site: TideSiteData
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}

defineProps<Props>()
</script>
