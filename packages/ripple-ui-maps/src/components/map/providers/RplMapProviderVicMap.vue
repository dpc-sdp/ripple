<script setup lang="ts">
import { ref } from 'vue'

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
  layer: 'CARTO_WM_256',
  projection: 'EPSG:4326',
  styles: () => []
})

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
