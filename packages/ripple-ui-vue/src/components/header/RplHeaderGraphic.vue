<script setup lang="ts">
import { computed } from 'vue'
import { RplHeaderGraphicPlacement } from './constants'
import RplImage from '../image/RplImage.vue'
import RplTrianglesTop from '@dpc-sdp/ripple-ui-shared/assets/patterns/triangles-top.svg?skipsvgo'
import RplTrianglesBottom from '@dpc-sdp/ripple-ui-shared/assets/patterns/triangles-bottom.svg?skipsvgo'

interface Props {
  image?: string | boolean
  placement?: RplHeaderGraphicPlacement
}

const props = withDefaults(defineProps<Props>(), {
  image: undefined,
  placement: undefined
})

const suppliedImage = computed(() => typeof props.image === 'string')

const classes = computed(() => ({
  'rpl-header-graphic': true,
  [`rpl-header-graphic--${props.placement}`]: props.placement,
  'rpl-header-graphic--image': suppliedImage.value,
  'rpl-header-graphic--pattern': !suppliedImage.value
}))
</script>

<template>
  <div :class="classes">
    <RplImage v-if="suppliedImage" :src="image as string" alt="" />
    <RplTrianglesTop
      v-else-if="placement === 'top'"
      class="rpl-header-graphic__top"
      role="presentation"
    />
    <RplTrianglesBottom
      v-else
      class="rpl-header-graphic__bottom"
      role="presentation"
    />
  </div>
</template>

<style src="@dpc-sdp/ripple-ui-styles/components/header/RplHeaderGraphic.css" />
