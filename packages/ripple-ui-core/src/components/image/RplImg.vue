<script setup lang="ts">
interface Props {
  src: string
  srcSet?: string
  width?: number
  height?: number
  alt?: string
  title?: string
  loading?: string
  fetchpriority?: string
  rendered?: {
    width: number
    height: number
  }
}

withDefaults(defineProps<Props>(), {
  alt: '',
  title: '',
  height: undefined,
  width: undefined,
  sizes: undefined,
  rendered: undefined,
  srcSet: undefined,
  loading: 'lazy',
  fetchpriority: 'auto'
})
</script>

<template>
  <img
    :src="src"
    :srcset="srcSet"
    :width="rendered?.width || width"
    :height="rendered?.height || height"
    :alt="alt"
    :title="title"
    :loading="loading"
    :fetchpriority="fetchpriority"
  />
</template>
