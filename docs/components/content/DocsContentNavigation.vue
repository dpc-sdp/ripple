<script setup lang="ts">
import { NavItem } from '@nuxt/content/dist/runtime/types'
import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

const route = useRoute()
const { sections } = useAppConfig()

// The site is split into sections with separate sidebar navigations
// E.g. If we on the page `/cats/are/cute`, then we just want the content for 'cats' (i.e. `queryContent('cats')`)
const sectionSlug = route.params.slug[0]

function isActive(nuxtNavItem: NavItem) {
  if (nuxtNavItem.children && nuxtNavItem.children.length) {
    return route.path.startsWith(nuxtNavItem._path)
  }

  return route.path === nuxtNavItem._path
}

const transformToRplNavFormat = (nuxtNavItem: NavItem): IRplVerticalNavItem => {
  return {
    id: nuxtNavItem._path,
    text: nuxtNavItem.title,
    url: nuxtNavItem._path,
    active: isActive(nuxtNavItem),
    items: nuxtNavItem.children
      ? nuxtNavItem.children
          .filter((child) => child._path !== nuxtNavItem._path)
          .map(transformToRplNavFormat)
      : undefined
  }
}

const { data: navigation } = await useAsyncData('navigation', async () => {
  const nav = await fetchContentNavigation(
    queryContent(sectionSlug || 'design-system')
  )

  const sectionNav = nav ? nav[0]?.children : null

  if (!sectionNav) {
    return []
  }

  return sectionNav.map(transformToRplNavFormat)
})
</script>

<template>
  <div>
    <RplVerticalNav :items="navigation" />

    <NuxtLink
      :to="sectionSlug === 'framework' ? '/design-system' : '/framework'"
      class="docs-sidebar-link rpl-type-p-small rpl-u-focusable-block"
    >
      {{
        sectionSlug === 'framework'
          ? sections['design-system'].title
          : sections['framework'].title
      }}
      <RplIcon
        name="icon-link-external-square-filled"
        size="xs"
        class="rpl-u-margin-l-1"
      />
    </NuxtLink>
  </div>
</template>

<style scoped>
.rpl-vertical-nav {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.docs-sidebar-link {
  display: block;
  padding: var(--rpl-sp-3) var(--local-vertical-nav-item-gutter);
  margin-top: var(--rpl-sp-3);
  font-weight: bold;
}

.docs-sidebar-link:hover {
  background-color: var(--local-vertical-nav-hover-bg);
  text-decoration: underline;
}

.docs-sidebar-link:active {
  background-color: var(--local-vertical-nav-hover-bg);
}
</style>
