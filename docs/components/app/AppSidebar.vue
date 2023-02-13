<template>
  <aside>
    <slot name="above"></slot>
    <nav>
      <DocsSidebarNavigation
        :links="navigation ? navigation[0].children : []"
      />
    </nav>
    <slot name="below"></slot>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

// The site is split into sections with separate sidebar navigations
// E.g. If we on the page `/cats/are/cute`, then we just want the content for 'cats' (i.e. `queryContent('cats')`)
const sectionSlug = route.params.slug[0]

const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation(queryContent(sectionSlug))
)
</script>
