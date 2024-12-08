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
import { Style, Text } from 'ol/style'
import { inject, nextTick, onMounted, Ref, ref } from 'vue'
import { Feature, Map } from 'ol'

interface Props {
  pinStyle: Function
}

const props = withDefaults(defineProps<Props>(), {})

const { rplMapRef } = inject<{ rplMapRef: Ref<Map | null> }>('rplMapInstance', {
  rplMapRef: ref(null)
})

const hoveredFeature = ref<Feature | null>(null)

const setClusterStyle = (
  style: Style,
  {
    clusterSize,
    isHovering = false
  }: {
    clusterSize: number
    isHovering?: boolean
  }
) => {
  const strokeWidthDefault = 16
  const strokeWidthHover = 20
  let circleRadius = 20 // 0.5 scale pixel size

  // Increase circle size for larger clusters
  if (clusterSize > 99) {
    circleRadius = 22
  }
  if (clusterSize > 999) {
    circleRadius = 24
  }

  const circleIcon = new CircleStyle({
    radius: circleRadius,
    fill: new Fill({
      color: [102, 102, 102, 1]
    }),
    stroke: new Stroke({
      color: [102, 102, 102, 0.2],
      // 2x pixel size
      width: isHovering ? strokeWidthHover : strokeWidthDefault
    })
  })

  const textStyle = new Text()
  textStyle.setText(clusterSize.toString())
  textStyle.setStroke(null)
  textStyle.setFill(
    new Fill({
      color: [255, 255, 255, 1]
    })
  )
  textStyle.setFont(`700 1.6rem VIC, Arial, Helvetica, sans-serif`)
  // text is rendered slightly off center in chrome and firefox, this is a middle ground so it's decent in all browsers
  textStyle.setOffsetY(0.25)

  style.setImage(circleIcon)
  style.setText(textStyle)
}

const overrideStyleFunction = (feature, style) => {
  const clusteredFeatures = feature.get('features')
  const size = clusteredFeatures.length

  if (clusteredFeatures && clusteredFeatures.length > 1) {
    setClusterStyle(style, {
      clusterSize: size
    })
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

onMounted(async () => {
  await nextTick()

  // Reset popup
  if (rplMapRef.value) {
    rplMapRef.value.on('pointermove', function (e) {
      if (hoveredFeature.value !== null) {
        hoveredFeature.value.setStyle(undefined)
        hoveredFeature.value = null
      }

      rplMapRef.value?.forEachFeatureAtPixel(e.pixel, function (f) {
        const clusteredFeatures = f.get('features')
        const currentFeature = f as Feature

        if (clusteredFeatures?.length > 1) {
          hoveredFeature.value = currentFeature
          const style = new Style()

          setClusterStyle(style, {
            clusterSize: clusteredFeatures.length,
            isHovering: true
          })

          currentFeature.setStyle(style)
          return true
        }
      })
    })
  }
})
</script>
