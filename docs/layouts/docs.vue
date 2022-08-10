<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-docs-page docs-layout">
    <RplIconSprite />
    <template v-if="theme?.debug">
      <component :is="'debug'" :config="theme?.debug" />
    </template>

    <DocsNavbar />
    <DocsPageContent class="min-h-page">
      <main class="lg:px-30">
        <NuxtPage />
      </main>
    </DocsPageContent>

    <RplDocFooter />
  </div>
</template>

<style>
.docus-content {
  font-size: 16px;
}
.docs-content {
  max-width: 800px;
}
:root {
  --header-height: 6.5rem;
}

main h1 {
  width: 100%;
  padding: 0 var(--rpl-sp-4) var(--rpl-sp-4) 0px;
  font-size: 58px;
  font-weight: 800;
  letter-spacing: -0.01rem;
  border-bottom: 1px solid #e1e3e6;
  -webkit-font-smoothing: antialiased;
}
</style>
