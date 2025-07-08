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
        >
          All modules
        </DocsNavLink>
        <DocsModuleInfo v-if="module" :module="module" />
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
        tag="DocsContent"
        v-if="page"
        :key="page.id"
        :value="page"
      >
      </ContentRenderer>
    </AppSidebarLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

interface Props {
  page: ContentCollectionItem
}

defineProps<Props>()

const route = useRoute()
const sectionSlug = route.params.slug[0]
const isModuleSection = sectionSlug === 'framework'
const packageName = route.params.slug[2].replace('@dpc-sdp-', '@dpc-sdp/')

const { data: module } = await useAsyncData(
  `module-info-${packageName}`,
  async () => {
    return queryCollection('modules')
      .where('packageName', '=', packageName)
      .first()
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
