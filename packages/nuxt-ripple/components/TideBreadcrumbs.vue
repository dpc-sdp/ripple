<template>
  <RplBreadcrumbs
    v-if="breadcrumbs"
    :items="breadcrumbs"
    data-cy="breadcrumbs"
  />
</template>

<script setup lang="ts">
import { RplBreadcrumbs } from '#components'
import { computed, toRaw, unref } from 'vue'
import { getBreadcrumbs } from '#imports'

interface IRplBreadcrumbsItem {
  text: string
  url: string
}

interface Props {
  siteMenu: any
  items?: IRplBreadcrumbsItem[]
  currentPath: string
  currentPageTitle: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
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
