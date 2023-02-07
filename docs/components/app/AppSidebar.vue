<template>
  <aside>
    <slot name="above"></slot>
    <nav>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <DocsSidebarNavigation :links="navigation[0].children" />
      </ContentNavigation>
    </nav>
    <slot name="below"></slot>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

// The site is split into sections with separate sidebar navigations
// E.g. If we on the page `/cats/are/cute`, then we just want the content for 'cats' (i.e. `queryContent('cats')`)
const sectionSlug = route.params.slug[0]
const query = queryContent(sectionSlug)
</script>
