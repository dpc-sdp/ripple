<script lang="ts">
export default { name: 'RplImage' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { distanceAsPercentage } from '../../lib/helpers'
import {
  RplImagePriority,
  RplImageFit,
  RplImageFocalPoint,
  RplImageAspect,
} from './constants'

interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  srcSet?: string
  circle?: boolean
  fit?: RplImageFit
  focalPoint?: RplImageFocalPoint
  aspect?: RplImageAspect | string
  priority?: typeof RplImagePriority[string]
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  height: undefined,
  width: undefined,
  sizes: undefined,
  srcSet: undefined,
  circle: false,
  fit: 'cover',
  focalPoint: null,
  aspect: null,
  priority: 'auto'
})

const aspectClasses = computed(() => {
  const base = `rpl-u-aspect`

  if (props.circle) {
    return { [`${base}-square`]: true }
  }
  if (typeof props.aspect === 'string') {
    return { [`${base}-${props.aspect}`]: true }
  }
  if (typeof props.aspect === 'object') {
    const o = {}
    for (const bp in props.aspect) {
      const breakpoint = bp !== 'xs' ? `-${bp}` : ''
      o[`${base}-${props.aspect[bp]}${breakpoint}`] = true
    }
    return o
  }

  return false
})

const classes = computed(() => ({
  ['rpl-image']: true,
  ['rpl-image--fill']: props.aspect,
  ['rpl-image--circle']: props.circle,
  [`rpl-image--${props.fit}`]: props.fit,
  ...aspectClasses.value
}))

const objectPosition = computed(() => {
  if (!props.height || !props.width || !props.focalPoint?.x || !props.focalPoint?.y) {
    return null
  }

  const xPercent = distanceAsPercentage(props.focalPoint.x, props.width)
  const yPercent = distanceAsPercentage(props.focalPoint.y, props.height)

  return { [`object-position`]: `${xPercent}% ${yPercent}%` }
})

const loading = computed(() => (props.priority === 'high' ? 'eager' : 'lazy'))
</script>

<template>
  <img
    :class="classes"
    :src="src"
    :srcset="srcSet"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="priority"
    :style="objectPosition"
  />
</template>

<style src="./image.css" />
