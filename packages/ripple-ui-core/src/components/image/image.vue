<script lang="ts">
export default { name: 'RplImage' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

type RplMediaAspect = {
  xs?: string
  s?: string
  m?: string
  l?: string
  xl?: string
}

interface Props {
  src: string
  width?: number
  height?: number
  alt?: string
  focalPoint?: {
    x: number
    y: number
  }
  sizes?: string | undefined
  aspect?: string | RplMediaAspect
  circle?: boolean
  priority?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  sizes: undefined,
  aspect: 'auto',
  priority: 'auto',
  circle: false,
  focalPoint: undefined,
  alt: ''
})

const aspectClasses = computed(() => {
  const base = `${name}--aspect`
  if (props.circle) {
    return { [`${base}-1`]: true }
  }
  if (typeof props.aspect === 'string') {
    return { [`${base}-${props.aspect}`]: true }
  }
  if (typeof props.aspect === 'object') {
    const o = {}
    for (const bp in props.aspect) {
      o[`${base}-${bp}-${props.aspect[bp]}`] = true
    }
    return o
  }
  return false
})

const name = 'rpl-image'

const classes = computed(() => {
  return {
    [`${name}`]: name,
    [`${name}--circle`]: props.circle,
    ...aspectClasses.value
  }
})
</script>

<template>
  <img
    :class="classes"
    :src="src"
    :loading="priority === 'high' ? 'eager' : 'lazy'"
    :fetchpriority="priority"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>

<style src="./image.css" />
