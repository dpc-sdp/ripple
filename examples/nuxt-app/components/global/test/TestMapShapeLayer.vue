<template>
  <ol-vector-layer :title="layerIdentifier" :zIndex="1">
    <ol-source-vector :zIndex="0" :url="lgaShapeURL" :format="shapeFormat">
    </ol-source-vector>
    <ol-style :overrideStyleFunction="defaultStyleFn">
      <ol-style-stroke :color="[102, 102, 102, 1]" width="2"></ol-style-stroke>
      <ol-style-fill :color="[255, 255, 255, 0.1]"></ol-style-fill>
    </ol-style>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { GeoJSON } from 'ol/format'
import { Style } from 'ol/style'
import Feature from 'ol/Feature'
import { computed } from 'vue'
interface Props {}

withDefaults(defineProps<Props>(), {})

const shapeFormat = new GeoJSON()

const lgaShapeURL = computed(() => {
  return `/test-map-shape-layer`
})

const defaultStyleFn = (feature: Feature, style: Style) => {
  style.getFill().setColor([255, 255, 255, 0.5])
}

const layerIdentifier = 'shapeLayer'
</script>
