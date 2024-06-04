<script setup lang="ts">
import useProviderImage from '../../composables/use-provider-image'
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

// Composable handles all the logic for determining the correct image to use
const { providerSrcSet, providerSizes } = useProviderImage(props)

const initialSrc = computed(() =>
  props.width
    ? `${props.src}?w=${props.width * 2 < 1984 ? props.width * 2 : 1984}`
    : props.src
)
</script>

<template>
  <img
    :src="initialSrc"
    :srcSet="providerSrcSet"
    :sizes="providerSizes"
    :width="width"
    :height="height"
    :alt="alt || ''"
  />
</template>
