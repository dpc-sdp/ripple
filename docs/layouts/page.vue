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
        tag="DocsContent"
        v-if="page"
        :key="page.id"
        :value="page"
      />
      <br />

      <RplTextLink
        class="rpl-u-margin-t-12 rpl-type-p"
        style="display: inline-flex; align-items: center"
        :url="`https://github.com/dpc-sdp/ripple-framework/edit/develop/docs/${page.id}`"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          class="rpl-u-margin-r-1"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1Zm-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71Zm10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
          ></path>
        </svg>
        Propose a change to this page on GitHub</RplTextLink
      >.
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
</script>
