<script setup lang="ts">
import { computed } from 'vue'
import { distanceAsPercentage } from '../../lib/helpers'
import {
  RplImagePriority,
  RplImageFit,
  IRplImageFocalPoint,
  RplImageAspect
} from './constants'

interface Props {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  sizes?: string
  rendered?: {
    width: number
    height: number
  }
  srcSet?: string
  circle?: boolean
  focalPoint?: IRplImageFocalPoint
  aspect?: RplImageAspect
  fit?: (typeof RplImageFit)[number]
  priority?: (typeof RplImagePriority)[number]
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  title: '',
  height: undefined,
  width: undefined,
  sizes: undefined,
  rendered: undefined,
  srcSet: undefined,
  circle: false,
  focalPoint: undefined,
  aspect: undefined,
  fit: 'cover',
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
  if (
    !props.height ||
    !props.width ||
    !props.focalPoint?.x ||
    !props.focalPoint?.y
  ) {
    return
  }

  const xPercent = distanceAsPercentage(props.focalPoint.x, props.width)
  const yPercent = distanceAsPercentage(props.focalPoint.y, props.height)

  return { [`object-position`]: `${xPercent}% ${yPercent}%` }
})

const loading = computed(() => (props.priority === 'high' ? 'eager' : 'lazy'))
</script>

<template>
  <RplImg
    :class="classes"
    :src="src"
    :srcset="srcSet"
    :rendered="rendered"
    :alt="alt"
    :title="title"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="priority"
    :style="objectPosition"
  />
</template>

<style src="./RplImage.css" />
