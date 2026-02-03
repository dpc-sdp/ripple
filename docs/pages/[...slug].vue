<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import {
  computed,
  createError,
  queryCollection,
  useAsyncData,
  useRoute,
  useSeoMeta
} from '#imports'

const route = useRoute()

const routePath = computed(() => {
  return route.path.replace(/\/$/, '')
})

const { data: page } = await useAsyncData(routePath.value, () => {
  return queryCollection('content' as never)
    .path(routePath.value)
    .first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

useSeoMeta({
  title: page.value?.seo?.title,
  description: page.value?.seo?.description
})

const layout = computed((): LayoutKey => {
  return (page.value?.layout as LayoutKey) ?? 'page'
})
</script>

<template>
  <NuxtLayout :name="layout" :page="page" />
</template>
