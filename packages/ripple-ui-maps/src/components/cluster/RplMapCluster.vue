<template>
  <ol-style :overrideStyleFunction="overrideStyleFunction">
    <ol-style-stroke color="red" :width="2"></ol-style-stroke>
    <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

    <ol-style-circle :radius="10">
      <ol-style-stroke
        :color="[0, 136, 206, 0.28]"
        :width="15"
        :lineDash="[]"
        lineCap="butt"
      ></ol-style-stroke>
      <ol-style-fill :color="[0, 136, 206, 1]"></ol-style-fill>
    </ol-style-circle>

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

const overrideStyleFunction = (feature, style) => {
  const clusteredFeatures = feature.get('features')
  const size = clusteredFeatures.length
  const icon = computed(() => {
    const ic = new Icon({ src: markerIconDefaultSrc, color: 'red' })
    ic.load()
    return ic
  })
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

  const circle = computed(() => createCircleStyle({ radius: 20 }))

  if (feature.get('features').length > 1) {
    style.setImage(circle.value)
    style.getText().setText(size.toString())
    style.getText().setStroke(undefined)
    style.getText().setFont('14px VIC-Bold, Arial, Helvetica, sans-serif')
  } else {
    style.getText().setText('')
    style.setImage(icon.value)
  }
}
</script>
