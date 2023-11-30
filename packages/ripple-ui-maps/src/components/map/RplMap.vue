<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
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
import zoomInIcon from './../../assets/icons/icon-map-zoom-in.svg?raw'
import zoomOutIcon from './../../assets/icons/icon-map-zoom-out.svg?raw'
import enlargeIcon from './../../assets/icons/icon-enlarge.svg?raw'
import homeIcon from './../../assets/icons/icon-home.svg?component'
import useMapControlLabel from './../../composables/useMapControlLabel'
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
      color
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

const { createHTMLElementFromString } = useMapControlLabel()
const zoomInLabel = createHTMLElementFromString(zoomInIcon)
const zoomOutLabel = createHTMLElementFromString(zoomOutIcon)
const fullScreenLabel = createHTMLElementFromString(enlargeIcon)

function onMapSingleClick(evt) {
  const map = mapRef.value.map
  const point = getfeaturesAtMapPixel(map, evt.pixel)
  if (point && point.features) {
    if (point.features.length > 1) {
      // if we click on a cluster we zoom to fit all the items in view
      zoomToClusterExtent(point.features, popup, map, props.projection)
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
}

function onMapMove(evt) {
  const map = mapRef.value.map
  if (map) {
    const point = getfeaturesAtMapPixel(map, evt.pixel)
    if (point && point.features) {
      document.querySelector('canvas').style.cursor = 'pointer'
    } else {
      document.querySelector('canvas').style.cursor = 'default'
    }
  }
}

function onHomeClick() {
  centerMap(mapRef.value.map, center.value, { y: 0, x: 0 }, props.initialZoom)
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
        <ol-overlay :position="popup.position" positioning="top-center">
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

      <ol-zoom-control
        className="rpl-map__control rpl-map__control-zoom"
        :zoomInLabel="zoomInLabel"
        :zoomOutLabel="zoomOutLabel"
      />
      <div className="rpl-map__control rpl-map__control-home">
        <button title="Centre map" @click="onHomeClick">
          <homeIcon></homeIcon>
        </button>
      </div>
      <ol-fullscreen-control
        :label="fullScreenLabel"
        :labelActive="fullScreenLabel"
        className="rpl-map__control rpl-map__control-fullscreen"
      />
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
