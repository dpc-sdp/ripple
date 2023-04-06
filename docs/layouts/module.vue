<template>
  <AppLayout :theme="isModuleSection ? 'module' : 'default'">
    <template #menuContents>
      <DocsModuleNavigation />
    </template>

    <AppSidebarLayout :hideMobileSidebar="false">
      <template #aside>
        <DocsNavLink
          url="/framework/modules/all-modules"
          icon="icon-chevron-left"
          iconPosition="start"
          >All modules</DocsNavLink
        >
        <DocsModuleInfo :module="module" />
        <div class="docs-sidebar-nav">
          <DocsModuleNavigation />
        </div>
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

const { data: module } = await useAsyncData(
  `module-info-${route.params.slug[2]}`,
  async () => {
    const moduleInfo = await queryContent(
      `${route.params.slug[0]}/${route.params.slug[1]}/${route.params.slug[2]}/_module`
    ).findOne()

    return moduleInfo || null
  }
)
</script>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-sidebar-nav {
  display: none;

  @media (--rpl-bp-l) {
    display: block;
  }
}
</style>
