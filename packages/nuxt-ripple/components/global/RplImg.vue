<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  srcSet?: string
  sizes?: any
  rendered?: any
  width?: number
  height?: number
  alt?: string
  title?: string
  loading?: string
  fetchpriority?: string
}

const props = withDefaults(defineProps<Props>(), {
  srcSet: undefined,
  sizes: undefined,
  rendered: undefined,
  width: undefined,
  height: undefined,
  alt: '',
  title: '',
  loading: 'lazy',
  fetchpriority: 'auto'
})

const bpMax = {
  xs: 768,
  s: 992,
  m: 1200
}

const aspect = (label: string) => {
  switch (label) {
    case 'panorama':
      return 2
    case 'square':
      return 1
    case 'ultrawide':
      return 21 / 9
    case 'wide':
    default:
      return 16 / 9
  }
}

const providerSrcSet = computed(() => {
  if (!props.rendered && !props.sizes) {
    return null
  }

  let sizes = props.sizes
  if (!Array.isArray(sizes)) {
    sizes = { xs: sizes }
  }

  const dpr = 1

  const srcSet = Array<string>()
  for (const bp in props.rendered) {
    let w = 0
    if (props.rendered[bp].width) {
      w = Math.floor(dpr * props.rendered[bp].width)
    } else if (props.rendered[bp].height) {
      const h = Math.floor(dpr * props.rendered[bp].height)
      const calculatedAspect =
        props.width && props.height
          ? props.width / props.height
          : aspect(sizes[bp])
      w = Math.floor(h * calculatedAspect)
    }
    srcSet.push(
      `${props.src}?width=${w} ${calculatedWidth(
        props.rendered[bp],
        aspect(sizes[bp])
      )}w`
    )
  }
  return srcSet.join(', ')
})

const calculatedWidth = (r: any, aspect: number) =>
  Math.floor(r.width ? r.width : r.height * aspect)

const providerSizes = computed(() => {
  if (!props.rendered && !props.sizes) {
    return undefined
  }

  const sizes = Array<string>()
  const renderedIndex = Object.keys(props.rendered || {})
  const lastBp = renderedIndex[renderedIndex.length - 1]

  for (const bp in props.rendered) {
    if (bp === lastBp) {
      sizes.push(
        `${calculatedWidth(props.rendered[bp], aspect(props.sizes[bp]))}px`
      )
    } else {
      sizes.push(
        `(max-width: ${bpMax[bp]}px) ${calculatedWidth(
          props.rendered[bp],
          aspect(props.sizes[bp])
        )}px`
      )
    }
  }
  return sizes.join(', ')
})
</script>

<template>
  <img
    :src="src"
    :srcSet="providerSrcSet || srcSet"
    :sizes="providerSizes"
    :width="width"
    :height="height"
    :alt="alt"
    :title="title"
    :loading="loading"
    :fetchpriority="fetchpriority"
  />
</template>
