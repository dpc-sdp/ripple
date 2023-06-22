<template>
  <RplBreadcrumbs
    v-if="breadcrumbs"
    :items="breadcrumbs"
    :besideQuickExit="besideQuickExit"
    data-cy="breadcrumbs"
  />
</template>

<script setup lang="ts">
import { computed, toRaw, unref } from 'vue'
import { getBreadcrumbs } from '#imports'

interface IRplBreadcrumbsItem {
  text: string
  url: string
}

interface Props {
  siteMenu?: any
  items?: IRplBreadcrumbsItem[]
  currentPath?: string
  currentPageTitle?: string
  besideQuickExit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  siteMenu: undefined,
  items: () => [],
  currentPath: undefined,
  currentPageTitle: undefined,
  besideQuickExit: false
})

const breadcrumbs = computed(() => {
  return props.items.length > 0
    ? props.items
    : getBreadcrumbs(
        unref(props.currentPath),
        unref(props.currentPageTitle),
        toRaw(props.siteMenu)
      )
})
</script>
