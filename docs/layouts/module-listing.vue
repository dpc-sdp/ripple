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
          :key="mod.meta.path"
          :title="mod.name"
          :url="`${mod.meta.path?.replace(/\/module$/, '')}`"
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
import {
  computed,
  queryCollection,
  ref,
  useAsyncData,
  useRoute
} from '#imports'
// @ts-expect-error TS2614 import from local augment
import type { ContentCollectionItem } from '@nuxt/content'

interface Props {
  page: ContentCollectionItem
}

defineProps<Props>()

const route = useRoute()
const sectionSlug = route.params.slug[0]
const isModuleSection = sectionSlug === 'framework'

const { data: modules } = await useAsyncData(`module-listing`, async () => {
  return queryCollection('modules' as never).all()
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
