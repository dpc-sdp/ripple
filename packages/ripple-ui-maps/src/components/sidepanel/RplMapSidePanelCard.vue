<template>
  <div class="rpl-map-side-panel-card rpl-u-margin-b-2">
    <RplNavCard>
      <template #meta>
        <slot name="meta"
          ><h3 class="rpl-type-h4">{{ title }}</h3></slot
        >
      </template>
      <slot></slot>
      <RplButton variant="outlined" @click="onViewLocation"
        >View location</RplButton
      >
    </RplNavCard>
  </div>
</template>
<script setup lang="ts">
import { RplNavCard, RplButton } from '@dpc-sdp/ripple-ui-core/vue'
import { onMounted, inject } from 'vue'
import { getClosestPoint } from 'ol/geom'

interface Props {
  title: string
  feature?: {
    lat: number
    lng: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  feature: undefined
})
const { rplMapRef } = inject('rplMapInstance')

onMounted(() => {})

function onViewLocation() {
  if (props.feature) {
    const map = rplMapRef.value

    map.getView().animate({
      center: [props.feature.lng, props.feature.lat],
      zoom: 10
    })
  }
}
</script>

<style>
.rpl-map-side-panel-card .rpl-button {
  padding: var(--rpl-sp-2);
  margin: var(--rpl-sp-2) 0;
}
</style>
