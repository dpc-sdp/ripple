<template>
  <RplLayout :background="background">
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
    <template #aboveBody>
      <slot name="aboveBody"></slot>
    </template>
    <template #body="{ hasSidebar }">
      <slot name="body" :hasSidebar="hasSidebar"></slot>
    </template>
    <template #belowBody>
      <slot name="belowBody"></slot>
    </template>
    <template #aboveSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #belowSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <RplFooter :nav="site?.menus.menuMain"></RplFooter>
      </slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import {
  useRuntimeConfig,
  useFetch,
  useHead,
  useSiteTheme,
  useSiteMenu,
  useAppConfig
} from '#imports'
import { computed, onMounted } from 'vue'

interface Props {
  background?: string
  pageTitle: string
  pageLanguage?: string
  pageDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  background: 'default',
  pageLanguage: 'en-AU',
  pageDescription: ''
})

onMounted(() => {
  // Used for knowing when page is ready for cypress testing
  document.body.setAttribute('data-nuxt-hydrated', 'true')
})

const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

// @ts-ignore
const { data: site, error: siteError } = useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

if (siteError) {
  throw new Error("Site data couldn't be fetched")
}

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
  title: props.pageTitle,
  htmlAttrs: {
    lang: props.pageLanguage
  },
  style: style && [
    {
      children: `body { ${style} }`
    }
  ],
  meta: [
    {
      name: 'description',
      content: props.pageDescription
    }
  ]
})
</script>
