<script lang="ts">
export default { name: 'RplImage' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { distanceAsPercentage } from '../../lib/helpers'
import { RplImagePriority, RplImageFocalPoint, RplImageAspect, RplImageAspectMap } from './constants'

interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  srcSet?: string
  circle?: boolean
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
    return { [`${base}-${RplImageAspectMap[props.aspect]}`]: true }
  }
  if (typeof props.aspect === 'object') {
    const o = {}
    for (const bp in props.aspect) {
      const breakpoint = bp !== 'xs' ? `-${bp}`: ''
      o[`${base}-${RplImageAspectMap[props.aspect[bp]]}${breakpoint}`] = true
    }
    return o
  }
  return false
})

const classes = computed(() => ({
  ['rpl-image']: true,
  ['rpl-image--circle']: props.circle,
  ...aspectClasses.value
}))

const objectPosition = computed(() => {
  if (!props.focalPoint || !props.height || !props.width) return null

  const isCentered = props.focalPoint.x === 0 && props.focalPoint.y === 0
  const focalPoint = isCentered
    ? '50% 50%'
    : `${distanceAsPercentage(
        props.focalPoint.x,
        props.width
      )}% ${distanceAsPercentage(props.focalPoint.y, props.height)}%`

  return { [`object-position`]: focalPoint }
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
