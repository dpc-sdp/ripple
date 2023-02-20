<template>
  <AppLayout>
    <div class="rpl-container">
      <div class="rpl-grid">
        <AppSidebar class="docs-sidebar rpl-col-12 rpl-col-3-m"></AppSidebar>
        <main class="rpl-col-12 rpl-col-9-l docs-main">
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
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

:root {
  --rpl-content-max-width: none;
}

.docs-main {
  @media (--rpl-bp-l) {
    padding-left: var(--rpl-sp-9);
  }
}

.docs-sidebar {
  display: none;

  @media (--rpl-bp-l) {
    display: block;
  }
}
</style>
