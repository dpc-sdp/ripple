<script setup lang="ts">
import { computed } from 'vue'
import { RplHeaderGraphicPlacement } from './constants'
import RplImage from '../image/RplImage.vue'
import RplTriangles from '../../assets/patterns/triangles.svg?component'

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
    <RplTriangles v-else role="presentation" />
  </div>
</template>

<style src="./RplHeaderGraphic.css" />
