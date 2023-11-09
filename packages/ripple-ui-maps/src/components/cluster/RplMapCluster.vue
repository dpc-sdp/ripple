<template>
  <ol-style :overrideStyleFunction="overrideStyleFunction">
    <ol-style-text>
      <ol-style-fill color="white"></ol-style-fill>
    </ol-style-text>
  </ol-style>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon, { type Options } from 'ol/style/Icon'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'

interface Props {
  pinStyle: Function
}

const props = withDefaults(defineProps<Props>(), {})

const overrideStyleFunction = (feature, style) => {
  const clusteredFeatures = feature.get('features')
  const size = clusteredFeatures.length

  const createCircleStyle = (
    innerProperties: Omit<Options, 'fill' | 'stroke'>
  ) => {
    return new CircleStyle({
      ...innerProperties,
      fill: new Fill({
        color: [0, 136, 206, 1],
        width: 10
      }),
      stroke: new Stroke({
        color: [0, 136, 206, 0.28],
        width: 15
      })
    })
  }

  const circle = computed(() => createCircleStyle({ radius: 15 }))
  if (clusteredFeatures.length > 1) {
    style.setImage(circle.value)
    style.getText().setText(size.toString())
    style.getText().setStroke(undefined)
    style.getText().setFont('12px VIC-Bold, Arial, Helvetica, sans-serif')
  } else if (Array.isArray(clusteredFeatures)) {
    const icon = props.pinStyle(clusteredFeatures[0])
    style.getText().setText('')
    style.setImage(icon)
  }
}
</script>
