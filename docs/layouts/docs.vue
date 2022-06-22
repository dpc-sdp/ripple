<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <div id="docus-docs-page docs-layout">
    <template v-if="theme?.debug">
      <component :is="'debug'" :config="theme?.debug" />
    </template>

    <DocsNavbar />

    <DocsPageContent class="min-h-page">
      <NuxtPage />
    </DocsPageContent>

    <Footer />
  </div>
</template>

<style>
.docus-content {
  font-size: 16px;
}
:root {
  --header-height: 6.5rem;
}
</style>
