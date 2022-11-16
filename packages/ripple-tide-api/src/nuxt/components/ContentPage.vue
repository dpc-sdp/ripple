<template>
  <slot v-if="page" :name="`${componentName}Page`" v-bind="{ page, site }">
    <component :is="`${componentName}Page`" :page="page" :site="site">
      <template #sidebar>
        <slot name="aboveSidebar"></slot>
        <slot v-if="page.sidebar" name="sidebar">
          <TideSidebarSiteSectionNav
            v-if="page.sidebar.siteSectionNav"
            :nav="page.sidebar.siteSectionNav"
          />
          <TideSidebarRelatedLinks
            v-if="page.sidebar.relatedLinks?.length"
            :items="page.sidebar.relatedLinks"
          />
          <TideSidebarContactUs
            v-if="page.sidebar.contacts?.length"
            :contacts="page.sidebar.contacts"
          />
          <TideSidebarSocialShare
            v-if="page.sidebar.socialShareNetworks?.length"
            :networks="page.sidebar.socialShareNetworks"
            :page-title="page.title"
          />
        </slot>
        <slot name="belowSidebar"></slot>
      </template>
    </component>
  </slot>
  <slot v-else-if="pageError" name="error">
    <TideBaseLayout>
      <template #body>
        <!-- TODO: Add error handling in Error component -->
        <h1>{{ pageError.data?.error?.message }}</h1>
        <p>There was a 404 error</p>
      </template>
    </TideBaseLayout>
  </slot>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRoute, useRuntimeConfig, useFetch } from '#imports'

import { computed, onMounted } from 'vue'
import { pascalCase } from 'change-case'

const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

const [{ data: site, error: siteError }, { data: page, error: pageError }] =
  await Promise.all([
    useFetch('/api/tide/site', {
      baseURL: config.API_URL || '',
      params: {
        id: siteId
      }
    }),
    useFetch('/api/tide/page', {
      baseURL: config.API_URL || '',
      params: {
        path: route.path,
        site: siteId
      }
    })
  ])

// TODO: Properly handle this
if (siteError.value) {
  throw new Error("Site data couldn't be fetched")
}

onMounted(() => {
  console.log('we', site)
  console.log('w', page.value)
})

const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}`
)
</script>
