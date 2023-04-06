<script setup lang="ts">
import useProviderImage from '../../composables/use-provider-image'

interface Props {
  src: string
  aspect?: any
  srcSet?: string
  sizes?: any
  rendered?: any
}

const props = withDefaults(defineProps<Props>(), {
  aspect: undefined,
  srcSet: undefined,
  sizes: undefined,
  rendered: undefined
})

const { providerSrcSet, providerSizes } = useProviderImage(props)
</script>

<template>
  <img
    :src="src"
    :srcSet="providerSrcSet || srcSet"
    :sizes="providerSizes || sizes"
  />
</template>
