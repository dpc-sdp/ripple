<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { ref, onMounted } from 'vue'

interface Props {
  projection?: 'EPSG:4326' | 'EPSG:3857'
  baseUrl?: string
  requestParams?: Record<string, any>
  layer?: string
  format?: string
  styles?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    SERVICE: 'WMS',
    tilematrixset: 'EPSG%3A4326%3A512',
    VERSION: '1.3.0',
    LAYERS: 'CARTO_WM_512',
    request: 'GetTile',
    style: '123'
  }),
  format: 'image/png',
  layer: 'CARTO_WM_256'
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)
const token = `AAPKb4288179ee4c40c99fedf129bcf74633RxWXGuVkAefFF0Iz0GGNu8wjowjpR3YNV9kzJ5W8AIC3pO4xhbIjLWomfgdFebeS`
const url = ref(`${props.baseUrl}?tilematrixset=EPSG%3A3857%3A256&layers=`)
// https://base.maps.vic.gov.au/service?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=CARTO_WM_256&TILED=true&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=15967389.460660178%2C-4383204.9499851465%2C16280475.52851626%2C-4070118.8821290648
onMounted(async () => {
  // center.value = props.initialCenter
  // zoom.value = props.initialZoom
  // if (window.ol) {
  //   const test = await import('ol-ext')
  //   console.log(test)
  // }
})
</script>

<template>
  <ol-tile-layer>
    <ol-source-wmts
      :url="url"
      :params="requestParams"
      format="image/png"
      :layer="layer"
      styles=""
    ></ol-source-wmts>
  </ol-tile-layer>
</template>
