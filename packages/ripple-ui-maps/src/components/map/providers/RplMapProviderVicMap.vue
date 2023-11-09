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
// https://base.maps.vic.gov.au/service?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=CARTO_WM_256&TILED=true&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=16202204.01155224%2C-4539747.983913187%2C16241339.770034252%2C-4500612.225431177
// https://base.maps.vic.gov.au/service?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&tilematrixset=EPSG%253A4326%253A512&request=GetTile&LAYERS=CARTO_WM_256&STYLES=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&BBOX=0%2C-313086.06785608083%2C313086.06785608194%2C1.1059455573558807e-9
const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    SERVICE: 'WMS',
    request: 'GetTile',
    CRS: 'EPSG%3A3857'
  }),
  format: 'image/png',
  layer: 'CARTO_WM_256'
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)
const token = `AAPKb4288179ee4c40c99fedf129bcf74633RxWXGuVkAefFF0Iz0GGNu8wjowjpR3YNV9kzJ5W8AIC3pO4xhbIjLWomfgdFebeS`
const url = ref(`${props.baseUrl}`)
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
    <ol-source-tile-wms
      :url="url"
      :params="requestParams"
      format="image/png"
      :layers="layer"
      styles=""
    ></ol-source-tile-wms>
  </ol-tile-layer>
</template>
