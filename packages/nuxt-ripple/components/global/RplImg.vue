<script setup lang="ts">
import useProviderImage from '../../composables/use-provider-image'

interface Props {
  src: string
  width?: number | undefined
  height?: number | undefined
  aspect?: any
  srcSet?: string
  sizes?: any
  rendered?: any
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  aspect: undefined,
  srcSet: undefined,
  sizes: undefined,
  rendered: undefined
})

// Default device pixel ratio of 1.6 will enhance images > 1.0 DPR while keeping filesize reasonable
const dpr = 1.6

// Composable handles all the logic for determining the correct image to use
const { providerSrcSet, providerSizes, initialWidth, initialHeight } =
  useProviderImage(props, dpr)
</script>

<template>
  <img
    :src="providerSrcSet ? undefined : src"
    :srcSet="providerSrcSet || srcSet"
    :sizes="providerSizes || sizes"
    :width="initialWidth"
    :height="initialHeight"
    :drupal_internal__target_id="null"
  />
</template>
