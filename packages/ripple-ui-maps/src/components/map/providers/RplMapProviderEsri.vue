<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { ref, onMounted } from 'vue'

interface Props {
  id: string
  projection?: 'EPSG:4326' | 'EPSG:3857'
  baseUrl?: string
  requestParams?: Record<string, any>
  layer?: string
  format?: string
  styles?: string | string[]
  initialZoom?: number
  initialCenter?: [number, number]
}

const props = withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    tilematrixset: 'EPSG%3A3857%3A256',
    version: '1.0.0',
    request: 'GetTile'
  }),
  format: 'image/png',
  layer: 'CARTO_WM_256',
  projection: 'EPSG:4326',
  styles: 'default',
  initialZoom: 8,
  initialCenter: () => [144.9631, -37.8136]
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)
const token = `AAPKb4288179ee4c40c99fedf129bcf74633RxWXGuVkAefFF0Iz0GGNu8wjowjpR3YNV9kzJ5W8AIC3pO4xhbIjLWomfgdFebeS`
const url = ref(`${props.baseUrl}?tilematrixset=EPSG%3A3857%3A256`)

onMounted(async () => {
  console.log('ESRI')
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
    <ol-source-xyz
      url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    />
  </ol-tile-layer>
</template>
