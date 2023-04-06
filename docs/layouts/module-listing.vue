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
        <div class="rpl-u-margin-b-8">
          <RplSearchBar id="listing-search" v-model:inputValue="searchTerm" />
        </div>
      </template>

      <DocsCardGrid>
        <RplPromoCard
          v-for="mod in filteredModules"
          :key="mod._path"
          :title="mod.name"
          :url="`${mod._path?.replace(/\/_module$/, '')}`"
        >
          <template #default>
            <p>{{ mod.description }}</p>
          </template>
        </RplPromoCard>
      </DocsCardGrid>
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

const { data: modules } = await useAsyncData(`module-listing`, async () => {
  return await queryContent()
    .where({ isModuleInfo: { $eq: true } })
    .find()
})

const searchTerm = ref('')

const filteredModules = computed(() => {
  return (modules.value || []).filter((module) => {
    const moduleName = module.name.toLowerCase()
    const term = searchTerm.value.toLowerCase()
    return moduleName.includes(term)
  })
})
</script>
