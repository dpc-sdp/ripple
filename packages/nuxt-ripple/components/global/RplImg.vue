<script setup lang="ts">
import { computed } from 'vue'

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

const props = withDefaults(defineProps<Props>(), {
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

const useProviderImage = computed(() => {
  if (!props.rendered) {
    return
  }

  const w = Math.floor(1.6 * props.rendered.width)
  const h = Math.floor(1.6 * props.rendered.height)
  return `${props.src}?width=${w}&height=${h}&strategy=auto`
})
</script>

<template>
  <img
    :src="useProviderImage || src"
    :srcset="srcSet"
    :width="rendered?.width || width"
    :height="rendered?.height || height"
    :alt="alt"
    :title="title"
    :loading="loading"
    :fetchpriority="fetchpriority"
  />
</template>
