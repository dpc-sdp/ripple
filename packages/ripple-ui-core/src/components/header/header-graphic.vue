<script lang="ts">
export default { name: 'RplHeaderGraphic' }
</script>

<script setup lang="ts">
import { RplGraphicPlacement } from './constants'
import { computed } from 'vue'

interface Props {
  image?: string
  placement?: RplGraphicPlacement
}

const props = withDefaults(defineProps<Props>(), {
  image: undefined,
  placement: undefined
})

const classes = computed(() => ({
  'rpl-header-graphic': true,
  [`rpl-header-graphic--${props.placement}`]: props.placement
}))
</script>

<template>
  <div :class="classes"></div>
</template>

<style src="./header-graphic.css" />
