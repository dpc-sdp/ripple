<template>
  <slot v-if="page" :name="`${componentName}Page`" v-bind="{page, site}">
    <component :is="`${componentName}Page`" :page="page">
      <template #aboveHeader>
        <RplIconSprite />
        <slot name="aboveHeader">
          <RplAlert v-for="alert in site.alerts" v-bind="alert" :key="alert.alertId" />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplNavPrimary></RplNavPrimary>
        </slot>
      </template>
      <template #breadcrumbs>
        <slot name="breadcrumbs">
          <RplBreadcrumbs v-if="breadcrumbs" v-bind="breadcrumbs"></RplBreadcrumbs>
        </slot>
      </template>
      <template #sidebar>
        <slot v-if="page.sidebar" name="sidebar" v-bind="page.sidebar">
          <RplContactUs v-if="page.sidebar" v-bind="page.sidebar?.contact" />
          <RplVerticalNav v-if="page.sidebar" v-bind="page.sidebar?.contact" title="Section name" :items="[]" />
        </slot>
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
          <RplAlert v-for="alert in site.alerts" v-bind="alert" :key="alert.alertId" />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplNavPrimary></RplNavPrimary>
        </slot>
      </template>
      <template #body>
        <!-- TODO: Add error handling in Error component -->
        <h1>{{pageError.data?.error?.message}}</h1>
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
import { useRoute, useRuntimeConfig, useFetch, useHead, useSiteTheme } from '#imports'
import { computed } from 'vue'
import { pascalCase } from 'change-case'

const route = useRoute()
const config = useRuntimeConfig()
// @ts-ignore
const [{ data: site, error: siteError }, { data: page, error: pageError }] = await Promise.all([
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

// TODO: Will need to implement breadcrumb business logic
const breadcrumbs = computed(() => {
  return {
    items: [{ label: 'Home', url: '/' }, { label: 'Page title', url: '/page-title' }]
  }
})

const style = useSiteTheme(site.value?.theme)
useHead({
  title: page.value?.title,
  htmlAttrs: {
    lang: page.value?.lang || 'en-AU',
  },
  style: style && [
    {
      children: `body { ${style} }`,
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

<style>
.rpl-tide-page {
  &__header {
    padding: var(--rpl-sp-5);
  }

  &__body {
    padding: var(--rpl-sp-5);
    margin-left: auto;
    margin-right: auto;
  }

}
</style>
