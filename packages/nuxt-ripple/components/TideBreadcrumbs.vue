<template>
  <RplBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" data-cy="breadcrumbs" />
</template>

<script setup lang="ts">
import { RplBreadcrumbs } from '@dpc-sdp/ripple-ui-core'
import { computed, toRaw, unref } from 'vue'
import { getBreadcrumbs } from '#imports'
interface Props {
  siteMenu: any
  currentPath: string
  currentPageTitle: string
}

const props = withDefaults(defineProps<Props>(), {})

const breadcrumbs = computed(() => {
  return getBreadcrumbs(
    unref(props.currentPath),
    unref(props.currentPageTitle),
    toRaw(props.siteMenu)
  )
})
</script>
