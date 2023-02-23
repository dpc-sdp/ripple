<template>
  <AppLayout>
    <template #menuContents>
      <DocsContentNavigation />
    </template>

    <div class="rpl-container">
      <div class="rpl-grid">
        <aside
          class="docs-sidebar rpl-col-12 rpl-col-3-m"
          :style="{
            '--local-vertical-nav-background': 'transparent',
            '--local-vertical-nav-item-gutter': 'var(--rpl-sp-3)',
            '--local-vertical-nav-hover-bg': 'var(--rpl-clr-neutral-100)'
          }"
        >
          <DocsContentNavigation />
        </aside>
        <main class="docs-main rpl-col-12 rpl-col-9-l">
          <DocsPageHeader
            :title="page.title"
            :description="page.description"
            :links="page.links"
          />
          <div class="docs-content">
            <ContentRenderer
              :tag="page.tag || 'RplContent'"
              v-if="page"
              :key="page._id"
              :value="page"
            >
            </ContentRenderer>
          </div>
        </main>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'

const { page } = useContent()

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

.docs-content {
  padding-top: var(--rpl-sp-3);
  padding-bottom: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-4);
  }
}
</style>
