<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { onMounted, ref, inject, computed } from 'vue'
import { Map } from 'ol'
import Icon from 'ol/style/Icon'
import { fromLonLat } from 'ol/proj'
import RplMapPopUp from './../popup/RplMapPopUp.vue'
import RplMapCluster from './../cluster/RplMapCluster.vue'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import zoomInIcon from './../../assets/icons/icon-zoom-in.svg?raw'
import zoomOutIcon from './../../assets/icons/icon-zoom-out.svg?raw'
import enlargeIcon from './../../assets/icons/icon-enlarge.svg?raw'
import onMapClick from './../../composables/onMapClick'

interface Props {
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  initialZoom?: number
  initialCenter?: [number, number]
  pinStyle?: Function
  mapHeight?: number
  popupType?: 'sidebar' | 'feature'
}

const props = withDefaults(defineProps<Props>(), {
  closeOnMapClick: true,
  projection: 'EPSG:4326',
  features: () => [],
  initialZoom: 7.3,
  mapHeight: 600,
  popupType: 'sidebar',
  initialCenter: () => [144.9631, -36.8136], // melbourne CBD
  pinStyle: (feature) => {
    const ic = new Icon({
      src: markerIconDefaultSrc,
      color: feature.get('color') || 'red'
    })
    ic.load()
    return ic
  }
})

const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const { setRplMapRef, setRplMapSelectedFeatures } = inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)
const { popupIsOpen, selectedFeatures, overlayPosition } = onMapClick(
  mapRef,
  props.closeOnMapClick,
  props.projection
)

onMounted(() => {
  setRplMapRef(mapRef.value.map)
  setRplMapSelectedFeatures(selectedFeatures)
})

const center = computed(() => {
  if (props.projection === 'EPSG:3857') {
    return fromLonLat(props.initialCenter)
  } else {
    return props.initialCenter
  }
})

const mapFeatures = computed(() => {
  if (Array.isArray(props.features)) {
    if (props.projection === 'EPSG:4326') {
      return props.features
    } else if (props.projection === 'EPSG:3857') {
      // we convert all features to match projection
      return props.features.map((itm) => {
        const geoPoint = fromLonLat([itm.lng, itm.lat])
        return {
          ...itm,
          lng: geoPoint[0],
          lat: geoPoint[1]
        }
      })
    }
  }
  return []
})

function onPopUpClose() {
  popupIsOpen.value = false
}

const createHTMLElementFromString = (text: string): HTMLDivElement => {
  const div = document.createElement('div')
  div.innerHTML = text.trim()
  return div.firstElementChild
}

const zoomInLabel = createHTMLElementFromString(zoomInIcon)
const zoomOutLabel = createHTMLElementFromString(zoomOutIcon)
const fullScreenLabel = createHTMLElementFromString(enlargeIcon)
</script>

<template>
  <div class="rpl-map">
    <slot name="sidebar" :popupIsOpen="popupIsOpen" :mapHeight="mapHeight">
      <RplMapPopUp
        v-if="popupType === 'sidebar'"
        :is-open="popupIsOpen"
        @close="onPopUpClose"
      >
        <template
          v-if="selectedFeatures && selectedFeatures.length > 0"
          #header
        >
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
    </slot>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      class="rpl-map__map"
      :style="`height: ${mapHeight}px`"
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
      <slot name="shapes"></slot>

      <ol-vector-layer v-if="mapFeatures && mapFeatures.length > 0">
        <slot name="features" :features="mapFeatures">
          <ol-animated-clusterlayer :animationDuration="500" :distance="40">
            <ol-source-vector>
              <ol-feature
                v-for="feature in mapFeatures"
                :key="feature.id"
                :properties="feature"
              >
                <ol-geom-point
                  :coordinates="[feature.lng, feature.lat]"
                ></ol-geom-point>
                <ol-style> </ol-style>
              </ol-feature>
            </ol-source-vector>
            <slot name="pin">
              <RplMapCluster :pinStyle="pinStyle"></RplMapCluster>
            </slot>
          </ol-animated-clusterlayer>
        </slot>
      </ol-vector-layer>

      <slot
        name="popup"
        :overlayPosition="overlayPosition"
        :popupIsOpen="popupIsOpen"
      >
        <ol-overlay
          v-if="popupIsOpen && popupType === 'feature'"
          :position="overlayPosition"
          positioning="top-center"
        >
          <RplMapPopUp
            :is-open="popupIsOpen"
            :type="popupType"
            @close="onPopUpClose"
          >
            <template #header>
              <slot name="popupTitle" :selectedFeatures="selectedFeatures">
                {{ selectedFeatures[0].title }}
              </slot>
            </template>
            <slot name="popupContent" :selectedFeatures="selectedFeatures">
              <p class="rpl-type-p-small">
                {{ selectedFeatures[0].description }}
              </p>
            </slot>
          </RplMapPopUp>
        </ol-overlay>
      </slot>

      <ol-zoom-control
        className="rpl-map__control rpl-map__control-zoom"
        :zoomInLabel="zoomInLabel"
        :zoomOutLabel="zoomOutLabel"
      />
      <ol-fullscreen-control
        :label="fullScreenLabel"
        className="rpl-map__control rpl-map__control-fullscreen"
      />
    </ol-map>
    <div class="rpl-map__legend">
      <slot name="legend"></slot>
    </div>
  </div>
</template>

<style src="./RplMap.css" />
