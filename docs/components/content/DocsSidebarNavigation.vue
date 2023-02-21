<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const route = useRoute()
const { sections } = useAppConfig()

// The site is split into sections with separate sidebar navigations
// E.g. If we on the page `/cats/are/cute`, then we just want the content for 'cats' (i.e. `queryContent('cats')`)
const sectionSlug = route.params.slug[0]

function isActive(link) {
  if (link.children && link.children.length) {
    return route.path.startsWith(link._path)
  }

  return route.path === link._path
}

const transform = (old) => {
  return {
    id: old._path,
    text: old.title,
    url: old._path,
    active: isActive(old),
    items: old.children ? old.children.map(transform) : undefined
  }
}

const { data: navigation } = await useAsyncData('navigation', async () => {
  const nav = await fetchContentNavigation(
    queryContent(sectionSlug || 'design-system')
  )
  return (nav ? nav[0].children : []).map(transform)
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
