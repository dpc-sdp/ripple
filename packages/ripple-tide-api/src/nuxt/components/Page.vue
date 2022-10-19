<template>
  <slot v-if="page" :name="`${componentName}Page`" v-bind="{ page, site }">
    <component :is="`${componentName}Page`" :page="page">
      <template #aboveHeader>
        <RplIconSprite />
        <slot name="aboveHeader">
          <RplAlert
            v-for="alert in site.alerts"
            v-bind="alert"
            :key="alert.alertId"
          />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplPrimaryNav v-bind="primaryNavProps"></RplPrimaryNav>
        </slot>
      </template>
      <template #breadcrumbs>
        <slot name="breadcrumbs">
          <RplBreadcrumbs
            v-if="breadcrumbs"
            v-bind="breadcrumbs"
          ></RplBreadcrumbs>
        </slot>
      </template>
      <template #sidebar>
        <slot name="aboveSidebar"></slot>
        <slot v-if="page.sidebar" name="sidebar">
          <TideSidebarSiteSectionNav :nav="page.sidebar.siteSectionNav" />
          <TideSidebarRelatedLinks :items="page.sidebar.relatedLinks" />
          <TideSidebarContactUs :contacts="page.sidebar.contacts" />
          <TideSidebarSocialShare
            :networks="page.sidebar.socialShareNetworks"
            :pageTitle="page.title"
          />
        </slot>
        <slot name="belowSidebar"></slot>
      </template>
      <template #footer>
        <slot name="footer">
          <RplFooter></RplFooter>
        </slot>
      </template>
    </component>
  </slot>
  <slot v-else-if="pageError || siteError" name="error">
    <RplLayout>
      <template #aboveHeader>
        <RplIconSprite />
        <slot v-if="site && site.alerts" name="aboveHeader">
          <RplAlert
            v-for="alert in site.alerts"
            v-bind="alert"
            :key="alert.alertId"
          />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplPrimaryNav v-bind="primaryNavProps"></RplPrimaryNav>
        </slot>
      </template>
      <template #body>
        <!-- TODO: Add error handling in Error component -->
        ERROR!
        <h1>{{ pageError?.message }}</h1>
      </template>
      <template #footer>
        <slot name="footer">
          <RplFooter></RplFooter>
        </slot>
      </template>
    </RplLayout>
  </slot>
</template>

<script setup lang="ts">
// @ts-ignore
import {
  useRoute,
  useRuntimeConfig,
  useFetch,
  useHead,
  useSiteTheme,
  useSiteMenu
} from '#imports'
import { computed } from 'vue'
import { pascalCase } from 'change-case'
import TideSidebarSiteSectionNav from './sidebar/TideSidebarSiteSectionNav.vue'

const route = useRoute()
const config = useRuntimeConfig()
// @ts-ignore
const [{ data: site, error: siteError }, { data: page, error: pageError }] =
  await Promise.all([
    useFetch('/api/tide/site', {
      baseURL: config.API_URL || '',
      params: {
        id: config.SITEID
      }
    }),
    useFetch('/api/tide/page', {
      baseURL: config.API_URL || '',
      params: {
        path: route.path,
        site: config.SITEID
      }
    })
  ])

const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}`
)

// TODO: Wire useSiteMenu up to real content, currently hardcoded with example
// from storybook.
const primaryNavProps = useSiteMenu(site)

// TODO: Will need to implement breadcrumb business logic
const breadcrumbs = computed(() => {
  return {
    items: [
      { label: 'Home', url: '/' },
      { label: 'Page title', url: '/page-title' }
    ]
  }
})

const style = useSiteTheme(site.value?.theme)
useHead({
  title: page.value?.title,
  htmlAttrs: {
    lang: page.value?.lang || 'en-AU'
  },
  style: style && [
    {
      children: `body { ${style} }`
    }
  ],
  meta: [
    {
      name: 'description',
      content: page.value?.description
    }
  ]
})
</script>
