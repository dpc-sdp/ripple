<script lang="ts">
// Need to disable inheritance to avoid rendering calc props
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { StyleValue } from 'vue'

// Verbose declaration due to disabled inheritance
interface Props {
  class: string
  src: string
  alt: string
  width: number | undefined
  height: number | undefined
  srcset?: string
  sizes?: any
  loading: string
  fetchpriority: string
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
