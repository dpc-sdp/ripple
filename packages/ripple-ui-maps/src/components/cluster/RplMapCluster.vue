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
    // 0.5 scale pixel size
    style.setImage(createCircleStyle({ radius: 20 }))
    style.getText().setText(size.toString())
    style.getText().setStroke(undefined)
    style.getText().setFont('12px VIC-Bold, Arial, Helvetica, sans-serif')
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
