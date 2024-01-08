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
