<template>
  <ol-tile-layer>
    <ol-source-xyz :url="url" />
  </ol-tile-layer>
</template>
<script setup lang="ts">
interface Props {
  tileSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  tileSize: '256'
})

const access_token = `pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g`
const url = `https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/${props.tileSize}/{z}/{x}/{y}?access_token=${access_token}`
</script>
