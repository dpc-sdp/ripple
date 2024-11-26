<template>
  <ol-style :overrideStyleFunction="overrideStyleFunction">
    <ol-style-text>
      <ol-style-fill color="white"></ol-style-fill>
    </ol-style-text>
  </ol-style>
</template>

<script setup lang="ts">
import Icon from 'ol/style/Icon'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import type { Options } from 'ol/style/Circle'

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
        color: [102, 102, 102, 1]
      }),
      stroke: new Stroke({
        color: [102, 102, 102, 0.2],
        // 2x pixel size
        width: 16
      })
    })
  }

  if (clusteredFeatures && clusteredFeatures.length > 1) {
    let circleRadius = 20 // 0.5 scale pixel size
    // Increase circle size for larger clusters
    if (size > 99) {
      circleRadius = 22
    }
    if (size > 999) {
      circleRadius = 24
    }

    style.setImage(createCircleStyle({ radius: circleRadius }))
    style.getText().setText(size.toString())
    style.getText().setStroke(undefined)
    style.getText().setFont(`700 1.6rem VIC, Arial, Helvetica, sans-serif`)
    // text is rendered slightly off center in chrome and firefox, this is a middle ground so it's decent in all browsers
    style.getText().setOffsetY(0.25)
  } else if (Array.isArray(clusteredFeatures) && clusteredFeatures[0]) {
    const icon = props.pinStyle(
      clusteredFeatures[0].getProperties(),
      Icon,
      markerIconDefaultSrc
    )
    if (typeof icon === 'string') {
      style.setImage(
        new Icon({
          src: markerIconDefaultSrc,
          color: icon,
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction'
        })
      )
    } else {
      style.setImage(icon)
    }
    style.getText().setText('')
  }
  return style
}
</script>
