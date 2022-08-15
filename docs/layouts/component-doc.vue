<script setup lang="ts">
import { computed, useContent } from '#imports'
import InPageTabs from '~/components/app/InPageTabs.vue'
const { page } = useContent()

const aside = computed(() => {
  if (typeof page.value?.aside !== 'undefined') return page.value.aside
  return true
})
</script>

<template>
  <div id="docus-docs-page docs-layout">
    <RplIconSprite />
    <template v-if="theme?.debug">
      <component :is="'debug'" :config="theme?.debug" />
    </template>

    <DocsNavbar />

    <main>
      <Container
        padded
        class="
          relative
          flex flex-col-reverse
          pb-4
          sm:pb-6
          lg:grid lg:grid-cols-12
          lg:gap-8
        "
      >
        <!-- Aside -->
        <aside
          v-if="aside"
          class="
            hidden
            pb-8
            overflow-x-hidden overflow-y-auto
            lg:top-header
            lg:sticky
            lg:col-span-2
            lg:-mt-8
            lg:block
            lg:self-start
            lg:pb-0
            lg:pt-8
          "
        >
          <DocsAside />
        </aside>
        <div
          class="
            docs-component-body
            relative
            flex flex-col flex-1
            lg:mt-0
            lg:pt-8
            lg:col-span-8
            pt-12
          "
        >
          <h1 class="text-4xl my-8">{{ page.title }}</h1>
          <p class="text-lg docs-callout">{{ page.description }}</p>
          <InPageTabs :tabs="page.body.toc?.links" />
          <NuxtPage class="mt-8" />
        </div>
      </Container>
    </main>

    <RplDocFooter />
  </div>
</template>

<style scoped>
.docus-content {
  font-size: 16px;
  position: relative;
}
:root {
  --header-height: 6.5rem;
}
.docs-component-body {
  max-width: 800px;
}
</style>
