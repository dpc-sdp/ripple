<template>
  <AppLayout>
    <div class="rpl-container">
      <div class="rpl-grid">
        <AppSidebar class="rpl-col-12 rpl-col-3-m"></AppSidebar>
        <main class="rpl-col-12 rpl-col-9-m docs-main">
          <DocsPageHeader
            :title="page.title"
            :description="page.description"
            :links="page.links"
          />
          <ContentRenderer
            :tag="page.tag || 'RplContent'"
            v-if="page"
            :key="page._id"
            :value="page"
          >
          </ContentRenderer>
        </main>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'

const { page, toc } = useContent()

useContentHead(page)
</script>

<style>
:root {
  --rpl-content-max-width: none;
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}

.docs-main {
  padding-left: var(--rpl-sp-9);
}
</style>
