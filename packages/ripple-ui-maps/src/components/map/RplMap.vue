<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import type { IRplMapFeature } from './../../types'
import { onMounted, ref, inject, computed } from 'vue'
import { Map } from 'ol'
import { Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Feature from 'ol/Feature'
import { asString } from 'ol/color'
import { fromLonLat } from 'ol/proj'
import RplMapPopUp from './../popup/RplMapPopUp.vue'
import RplMapCluster from './../cluster/RplMapCluster.vue'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import useMapControls from './../../composables/useMapControls.ts'

import {
  getfeaturesAtMapPixel,
  zoomToClusterExtent,
  centerMap
} from './utils.ts'

interface Props {
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  initialZoom?: number
  initialCenter?: [number, number]
  pinStyle?: Function
  mapHeight?: number
  popupType?: 'sidebar' | 'popover'
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
    let color = feature.color || 'red'
    const ic = new Icon({
      src: markerIconDefaultSrc,
      color,
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction'
    })
    ic.load()
    return ic
  }
})

const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const { setRplMapRef, popup } = inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)

onMounted(() => {
  setRplMapRef(mapRef.value.map)
})

const center = computed(() => {
  if (props.projection === 'EPSG:3857') {
    return fromLonLat(props.initialCenter)
  } else {
    return props.initialCenter
  }
})

const {
  onHomeClick,
  onZoomInClick,
  onZoomOutClick,
  onFullScreenClick,
  isFullScreenRef
} = useMapControls(mapRef, center, props.initialZoom)

const mapFeatures = computed(() => {
  if (Array.isArray(props.features)) {
    return props.features.map((itm, idx) => {
      const geoPoint = fromLonLat([itm.lng, itm.lat])
      return new Feature({
        geometry: new Point(geoPoint),
        index: idx,
        ...itm,
        lng: geoPoint[0],
        lat: geoPoint[1]
      })
    })
  }
  return []
})

function onPopUpClose() {
  popup.value.isOpen = false
}

function onMapSingleClick(evt) {
  const map = mapRef.value.map
  const point = getfeaturesAtMapPixel(map, evt.pixel)
  const largeClusterZoomAmount = 4 // Zoom levels to zoom in
  const largeClusterZoomLimit = 100 // Feature count at which to apply cluster zoom behaviour
  const clusterZoomOutLimit = 9 // Level at which to apply cluster zoom behaviour
  if (point && point.features) {
    if (point.features.length > 1) {
      const view = map.getView()
      const currentZoom = view.getZoom()
      // click on the cluster
      if (
        point.features.length > largeClusterZoomLimit ||
        currentZoom < clusterZoomOutLimit
      ) {
        // if there are lots of features and we are zoomed out, we just zoom in a bit
        view.animate({
          zoom: view.getZoom() + largeClusterZoomAmount,
          center: evt.coordinate
        })
      } else {
        // if there are fewer items we zoom into view all items in the cluster
        zoomToClusterExtent(point.features, popup, map, props.projection)
      }
    } else if (point.features.length === 1) {
      // if we click on a pin we open the popup
      const clickedFeature = point.features[0]
      const coordinates = clickedFeature.getGeometry().flatCoordinates
      const featureProperties = clickedFeature.getProperties()
      const pinStyle = props.pinStyle(featureProperties)
      const pinColor =
        typeof pinStyle === 'string' ? pinStyle : pinStyle?.getColor()
      popup.value.feature = [featureProperties]
      popup.value.color = asString(pinColor)
      popup.value.isOpen = true
      popup.value.isArea = false
      popup.value.position = coordinates
      centerMap(map, coordinates)
    }
  }

  if (!point || !point.features || point.features.length === 0) {
    popup.value.isOpen = false
  }
}

function onMapMove(evt) {
  const map = mapRef.value.map
  if (map) {
    const point = getfeaturesAtMapPixel(map, evt.pixel)
    if (point && point.features) {
      document.querySelector('.rpl-map canvas').style.cursor = 'pointer'
    } else {
      document.querySelector('.rpl-map canvas').style.cursor = 'default'
    }
  }
}
</script>

<template>
  <div class="rpl-map">
    <slot
      v-if="popupType === 'sidebar'"
      name="sidebar"
      :popupIsOpen="popup.isOpen"
      :mapHeight="mapHeight"
    >
      <RplMapPopUp :is-open="popup.isOpen" @close="onPopUpClose">
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
      :loadTilesWhileAnimating="false"
      :loadTilesWhileInteracting="false"
      class="rpl-map__map"
      :style="`height: ${mapHeight}px`"
      :controls="[]"
      @singleclick="onMapSingleClick"
      @pointermove="onMapMove"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :minZoom="7"
        :zoom="zoom"
      />
      <slot name="map-provider"> </slot>
      <slot name="shapes" :mapFeatures="mapFeatures"></slot>

      <ol-vector-layer v-if="mapFeatures && mapFeatures.length > 0">
        <slot name="features" :features="mapFeatures">
          <ol-animated-clusterlayer
            title="clusterLayer"
            :animationDuration="300"
            :distance="100"
            :zIndex="4"
          >
            <ol-source-vector :features="mapFeatures"> </ol-source-vector>
            <slot name="pin">
              <RplMapCluster :pinStyle="pinStyle"></RplMapCluster>
            </slot>
          </ol-animated-clusterlayer>
        </slot>
      </ol-vector-layer>

      <slot v-if="popupType === 'popover'" name="popup" :popup="popup">
        <ol-overlay
          :position="popup.position"
          positioning="top-center"
          :stopEvent="true"
        >
          <RplMapPopUp
            :is-open="popup.isOpen"
            :is-area="popup.isArea"
            :type="popupType"
            :pinColor="popup.color"
            @close="onPopUpClose"
          >
            <template #header>
              <slot name="popupTitle" :selectedFeatures="popup.feature">
                {{ popup.feature[0].title }}
              </slot>
            </template>
            <slot name="popupContent" :selectedFeatures="popup.feature">
              {{ popup.feature }}
              <p class="rpl-type-p-small">
                {{ popup.feature[0].description }}
              </p>
            </slot>
          </RplMapPopUp>
        </ol-overlay>
      </slot>
      <div class="rpl-map__control rpl-map__control-fullscreen">
        <button title="View map fullscreen" @click="onFullScreenClick">
          <RplIcon v-if="isFullScreenRef" name="icon-cancel"></RplIcon>
          <RplIcon v-else name="icon-enlarge" size="m"></RplIcon>
        </button>
      </div>
      <div class="rpl-map__control rpl-map__control-home">
        <button title="Centre map" @click="onHomeClick">
          <RplIcon name="icon-home"></RplIcon>
        </button>
      </div>
      <div class="rpl-map__control rpl-map__control-zoom">
        <button
          title="Zoom map in"
          class="rpl-map__control-zoom-in"
          @click="onZoomInClick"
        >
          <RplIcon name="icon-map-zoom-in" size="s"></RplIcon>
        </button>

        <button
          title="Zoom map out"
          class="rpl-map__control-zoom-out"
          @click="onZoomOutClick"
        >
          <RplIcon name="icon-map-zoom-out" size="s"></RplIcon>
        </button>
      </div>
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
