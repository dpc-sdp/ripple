<template>
  <AppLayout :theme="isModuleSection ? 'module' : 'default'">
    <template #menuContents>
      <DocsContentNavigation />
    </template>

    <AppSidebarLayout hideMobileSidebar>
      <template #aside>
        <DocsContentNavigation />
      </template>
      <template #pageHeader>
        <DocsPageHeader
          :title="page.title"
          :description="page.description"
          :links="page.links"
        />
      </template>
      <ContentRenderer
        :tag="page.tag || 'RplContent'"
        v-if="page"
        :key="page._id"
        :value="page"
      >
      </ContentRenderer>
    </AppSidebarLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'

const { page } = useContent()

if (!page.value) {
  throw createError({
    statusCode: 404
  })
}

useContentHead(page)

const route = useRoute()
const sectionSlug = route.params.slug[0]
const isModuleSection = sectionSlug === 'framework'
</script>
