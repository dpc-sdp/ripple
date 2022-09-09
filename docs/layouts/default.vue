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
        <h1
          class="
            rpl-type-h1
            pb-16
            mb-8
            border-b
            text-gray-900
            dark:text-gray-200
          "
        >
          {{ page.title }}
        </h1>
        <p v-if="page.description" class="rpl-type-p-large pb-8">
          {{ page.description }}
        </p>
        <ContentRenderer
          tag="RplContent"
          v-if="page"
          :key="page._id"
          :value="page"
        >
        </ContentRenderer>
      </main>
      <aside class="lg:col-span-2 ml-8" v-if="toc && toc.links">
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
import { useContent, useContentHead } from '#imports'

const { page, toc } = useContent()

useContentHead(page)
</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}
</style>
