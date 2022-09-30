<script lang="ts">
export default { name: 'RplHeaderGraphic' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplHeaderGraphicPlacement } from './constants'
import RplImage from '../image/image.vue'
import triangles from '../../assets/patterns/triangles.svg?url'

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
    <RplImage v-if="suppliedImage" :src="image" />
    <RplImage v-else :src="triangles" />
  </div>
</template>

<style src="./header-graphic.css" />
