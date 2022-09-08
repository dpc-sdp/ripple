<template>
  <AppLayout>
    <div
      class="
        px-4
        sm:px-6
        mx-auto
        max-w-full
        lg:max-w-7xl
        relative
        flex flex-col-reverse
        pb-4
        sm:pb-6
        lg:grid lg:grid-cols-12
        lg:gap-8
        min-h-page
      "
    >
      <AppSidebar class="lg:col-span-2"></AppSidebar>
      <main
        class="
          lg:col-span-8
          pt-8
          lg:pt-1
          relative
          flex flex-col flex-1
          lg:mt-0
          lg:pt-8
          text-gray-900
          dark:text-gray-200
        "
      >
        <h1 class="rpl-type-h1 pb-24 mb-4 border-b">
          {{ page.title }}
        </h1>
        <div
          v-if="links && links.length > 0"
          class="rpl-type-label-small flex flex-row mb-8"
        >
          <template v-for="link in links">
            <a :href="link.url" class="mr-6">
              <Icon
                class="w-5 h-5 my-2 text-slate-800"
                aria-hidden="true"
                :name="link.icon"
              />
              {{ link.text }}
            </a>
          </template>
        </div>
        <ContentRenderer
          tag="RplContent"
          v-if="page"
          :key="page._id"
          :value="page"
        >
        </ContentRenderer>
      </main>
      <aside
        class="lg:col-span-2 ml-8 relative"
        v-if="links && links.length > 0"
      >
        <nav>
          <RplInPageNavigation
            title="On this page"
            class="text-gray-900 dark:text-gray-200"
            :items="
              toc.links.map((itm) => ({
                text: itm.text,
                url: `#${itm.id}`
              }))
            "
          />
        </nav>
      </aside>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead, computed } from '#imports'

const { page, toc } = useContent()

useContentHead(page)

const links = computed(() => {
  const links = []
  const pageLinks = page.value?.links
  if (pageLinks) {
    if (pageLinks.figma) {
      links.push({
        text: 'Figma',
        url: pageLinks.figma,
        icon: 'logos:figma'
      })
    }
    if (pageLinks.storybook) {
      links.push({
        text: 'Storybook',
        url: pageLinks.storybook,
        icon: 'logos:storybook-icon'
      })
    }
  }
  return links
})
</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}
</style>
