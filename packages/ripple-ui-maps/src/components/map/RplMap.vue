<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { onMounted, ref, inject } from 'vue'
import { Map } from 'ol'
import RplMapFeaturePin from './../feature-pin/RplMapFeaturePin.vue'
import RplMapPopUp from './../popup/RplMapPopUp.vue'
import RplMapCluster from './../cluster/RplMapCluster.vue'
import onMapClick from './../../composables/onMapClick'

interface Props {
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  baseUrl?: string
  format?: string
  styles?: string | string[]
  initialZoom?: number
  initialCenter?: [number, number]
  closeOnMapClick: boolean
  basemapProvider: string
}

const props = withDefaults(defineProps<Props>(), {
  basemapProvider: 'esri',
  baseUrl: `https://base.maps.vic.gov.au/service`,
  closeOnMapClick: true,
  format: 'image/png',
  projection: 'EPSG:4326',
  styles: 'default',
  features: () => [],
  initialZoom: 7.3,
  initialCenter: () => [144.9631, -36.8136] // melbourne CBD
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const { setRplMapRef } = inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)

onMounted(() => {
  setRplMapRef(mapRef.value.map)
})

const { popupIsOpen, selectedFeatures } = onMapClick(
  mapRef,
  props.closeOnMapClick
)

function onPopUpClose() {
  popupIsOpen.value = false
}
</script>

<template>
  <div class="rpl-map">
    <RplMapPopUp :is-open="popupIsOpen" @close="onPopUpClose">
      <template v-if="selectedFeatures && selectedFeatures.length > 0" #header>
        <slot name="popupTitle" :selectedFeatures="selectedFeatures">
          {{ selectedFeatures[0].title }}
        </slot>
      </template>
      <template v-if="selectedFeatures && selectedFeatures.length > 0">
        <slot name="popupContent" :selectedFeatures="selectedFeatures">
          <p class="rpl-type-p-small">
            {{ selectedFeatures[0].description }}
          </p>
        </slot>
      </template>
    </RplMapPopUp>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 600px"
      :projection="projection"
      :controls="[]"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
      />
      <slot name="map-provider"> </slot>

      <ol-vector-layer v-if="features && features.length > 0">
        <slot name="features" :features="features">
          <ol-animated-clusterlayer :animationDuration="500" :distance="40">
            <ol-source-vector>
              <ol-feature
                v-for="feature in features"
                :key="feature.id"
                :properties="feature"
              >
                <ol-geom-point
                  :coordinates="[feature.lng, feature.lat]"
                ></ol-geom-point>
                <ol-style>
                  <slot name="pin">
                    <RplMapFeaturePin />
                  </slot>
                </ol-style>
              </ol-feature>
            </ol-source-vector>

            <RplMapCluster></RplMapCluster>
          </ol-animated-clusterlayer>
        </slot>
      </ol-vector-layer>
      <ol-zoom-control className="rpl-map__control rpl-map__control-zoom" />
      <ol-fullscreen-control
        className="rpl-map__control rpl-map__control-fullscreen"
      />
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
