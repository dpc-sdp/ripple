<script lang="ts" setup>
import {
  computed,
  createError,
  queryCollection,
  useAsyncData,
  useRoute,
  useSeoMeta
} from '#imports'

type PageData = {
  layout?: string
  seo?: {
    title?: string
    description?: string
  }
}

const route = useRoute()

const routePath = computed(() => {
  return route.path.replace(/\/$/, '')
})

const { data: page } = await useAsyncData<PageData | null>(
  routePath.value,
  () => {
    return (queryCollection as any)('content').path(routePath.value).first()
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

useSeoMeta({
  title: page.value.seo?.title,
  description: page.value.seo?.description
})

const layout = computed((): string => {
  return (page.value.layout as string) ?? 'page'
})
</script>

<template>
  <NuxtLayout :name="layout" :page="page" />
</template>
