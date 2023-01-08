<template>
  <RplLayoutSidebarComponent v-if="nav && nav.items && nav.items.length">
    <RplVerticalNav
      data-sidebar-component-id="tide-sidebar-site-section-nav"
      :title="nav.title"
      :items="nav.items"
    />
  </RplLayoutSidebarComponent>
</template>

<script setup lang="ts">
interface Props {
  nav?: {
    title: string
    items: Array<any>
  } | null
}

withDefaults(defineProps<Props>(), {
  nav: null
})
</script>
