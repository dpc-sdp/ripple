<script lang="ts">
// Need to disable inheritance to avoid rendering calc props
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ImgHTMLAttributes, StyleValue } from 'vue'

// Verbose declaration due to disabled inheritance
interface Props extends ImgHTMLAttributes {
  class: string
  src: string
  alt: string
  width: number | undefined
  height: number | undefined
  srcset?: string
  sizes?: any
  loading: 'lazy' | 'eager' | undefined
  fetchpriority: 'auto' | 'high' | 'low' | undefined
  style: StyleValue
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  srcset: undefined,
  sizes: undefined
})
</script>

<template>
  <img v-bind="props" />
</template>
