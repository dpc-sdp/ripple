<script setup lang="ts">
import { onMounted } from 'vue'

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

withDefaults(defineProps<Props>(), {
  baseUrl: `https://base.maps.vic.gov.au/service`,
  requestParams: () => ({
    tilematrixset: 'EPSG%3A3857%3A256',
    version: '1.0.0',
    request: 'GetTile'
  }),
  format: 'image/png',
  layer: 'CARTO_WM_512',
  projection: 'EPSG:4326',
  styles: 'default',
  initialZoom: 8,
  initialCenter: () => [144.9631, -37.8136]
})

onMounted(async () => {})
</script>

<template>
  <ol-tile-layer>
    <ol-source-xyz
      url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    />
  </ol-tile-layer>
</template>
