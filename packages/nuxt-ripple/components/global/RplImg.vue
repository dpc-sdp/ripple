<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  alt: string
  width?: number | undefined
  height?: number | undefined
  aspect?: any
  srcSet?: string
  sizes?: any
  // eslint-disable-next-line vue/prop-name-casing
  drupal_internal__target_id?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  aspect: undefined,
  srcSet: undefined,
  sizes: undefined,
  drupal_internal__target_id: undefined
})

const {
  public: { isStatic }
} = useRuntimeConfig()

const imageSrc = computed(() => {
  const baseUrl = isStatic ? 'images' : ''
  return `${baseUrl}${props.src?.replace(/\/$/, '')}`
})
</script>

<template>
  <NuxtImg
    :src="imageSrc"
    :sizes="sizes"
    :width="width"
    :height="height"
    :alt="alt || ''"
    loading="lazy"
  />
</template>
