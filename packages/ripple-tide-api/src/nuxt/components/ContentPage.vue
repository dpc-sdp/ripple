<template>
  <slot :name="`${componentName}Page`" v-bind="{ page, site }">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pascalCase } from 'change-case'
import { useTidePage, useTideSite } from '../composables'

const site = await useTideSite()
const page = await useTidePage()

const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}`
)
</script>
