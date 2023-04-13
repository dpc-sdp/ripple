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

const { providerSrcSet, providerSizes } = useProviderImage(props)
</script>

<template>
  <img
    :src="providerSrcSet ? undefined : src"
    :srcSet="providerSrcSet || srcSet"
    :sizes="providerSizes || sizes"
    :width="width"
    :height="height"
  />
</template>
