<template>
  <slot
    v-if="page && site"
    :name="`${componentName}Page`"
    v-bind="{ page, site }"
  >
    <component :is="`${componentName}`" :page="page" :site="site">
      <template #sidebar>
        <slot name="aboveSidebar"></slot>
        <slot v-if="page.sidebar" name="sidebar">
          <TideSidebarSiteSectionNav
            v-if="page.sidebar.siteSectionNav"
            :nav="page.sidebar.siteSectionNav"
          />
          <TideSidebarRelatedLinks
            v-if="page.sidebar.relatedLinks?.length"
            title="Related links"
            :items="page.sidebar.relatedLinks"
          />
          <TideSidebarRelatedLinks
            v-if="page.sidebar.whatsNext?.length"
            title="What's next"
            :items="page.sidebar.whatsNext"
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
</template>

<script setup lang="ts">
// @ts-ignore
import { useTideSite, useTidePage } from '#imports'
import { computed } from 'vue'
import { pascalCase, pascalCaseTransformMerge } from 'change-case'
import { defu as defuMerge } from 'defu'

let _site = await useTideSite()
const page = await useTidePage()

// Allow page site section settings to override the main site settings
const site = computed(() => {
  return _site && page?.siteSection?.siteOverrides
    ? defuMerge(page.siteSection.siteOverrides, _site)
    : _site
})

const componentName = computed(
  () =>
    page &&
    `Tide${pascalCase(page.type as string, { transform: pascalCaseTransformMerge })}`
)
</script>
