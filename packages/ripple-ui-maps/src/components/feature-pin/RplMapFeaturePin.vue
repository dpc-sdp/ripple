<template>
  <ol-style-icon
    :src="markerIcon"
    :scale="0.8"
    :size="[24, 24]"
    :color="color"
  ></ol-style-icon>
</template>
<script setup lang="ts">
import markerIconDefaultSrc from './icon-pin.svg?url'

interface Props {
  color?: string
  markerIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'red',
  markerIcon: markerIconDefaultSrc
})
</script>

<style></style>
