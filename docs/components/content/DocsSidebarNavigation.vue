<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const route = useRoute()

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

const transformed = computed(() => {
  return props.links.map(transform)
})

const { data: navigation } = await useAsyncData('navigation', async () => {
  const nav = await fetchContentNavigation(queryContent(sectionSlug))
  return (nav ? nav[0].children : []).map(transform)
})
</script>

<template>
  <div>
    <RplVerticalNav :items="navigation" />
  </div>
</template>

<style scoped>
.rpl-vertical-nav {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}
</style>
