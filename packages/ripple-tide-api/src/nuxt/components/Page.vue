<template>
  <slot
    v-if="page && site"
    :name="`${componentName}Page`"
    v-bind="{ page, site }"
  >
    <component :is="`${componentName}Page`" :page="page">
      <template #aboveHeader>
        <RplIconSprite />
        <slot name="aboveHeader">
          <RplAlert
            v-for="alert in site?.alerts"
            v-bind="alert"
            :key="alert.alertId"
          />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplPrimaryNav
            v-bind="primaryNavProps"
            :items="site?.menus.menuMain"
          ></RplPrimaryNav>
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
      <template #footer>
        <slot name="footer">
          <RplFooter :nav="site?.menus.menuMain"></RplFooter>
        </slot>
      </template>
    </component>
  </slot>
  <slot v-else-if="pageError || siteError" name="error">
    <RplLayout>
      <template #aboveHeader>
        <RplIconSprite />
        <slot v-if="site && site?.alerts" name="aboveHeader">
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
        <h1>{{ pageError.data?.error?.message }}</h1>
        <p>There was an error</p>
      </template>
      <template #footer>
        <slot name="footer">
          <RplFooter :items="site?.menus.menu"></RplFooter>
        </slot>
      </template>
    </RplLayout>
  </slot>
</template>

<script setup lang="ts">
import {
  useRoute,
  useRuntimeConfig,
  useFetch,
  useHead,
  useSiteTheme,
  useSiteMenu,
  useAppConfig
  // @ts-ignore
} from '#imports'

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

onMounted(() => {
  document.body.setAttribute('data-nuxt-hydrated', 'true')
})

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

const style = useSiteTheme(site.value?.theme || useAppConfig().theme)
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
