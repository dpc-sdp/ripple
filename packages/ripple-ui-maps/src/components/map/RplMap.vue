<script lang="ts">
const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--rpl-clr-primary')
</script>

<script setup lang="ts">
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import type { IRplMapFeature } from './../../types'
import {
  onMounted,
  onUnmounted,
  ref,
  inject,
  computed,
  watch,
  nextTick
} from 'vue'
import { useFullscreen } from '@vueuse/core'
import { withDefaults, defineExpose } from '@vue/composition-api'
import { Map } from 'ol'
import { Zoom } from 'ol/control'
import { Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Feature from 'ol/Feature'
import { asString } from 'ol/color'
import { fromLonLat } from 'ol/proj'
import RplMapPopUp from './../popup/RplMapPopUp.vue'
import RplMapCluster from './../cluster/RplMapCluster.vue'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import markerIconSelectedSrc from './../feature-pin/icon-pin-selected.svg?url'
import useMapControls from './../../composables/useMapControls.ts'

import {
  getfeaturesAtMapPixel,
  zoomToClusterExtent,
  centerMap,
  fitDefaultExtent,
  areFeaturesCloseTogether
} from './utils'

interface Props {
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  initialZoom?: number
  initialCenter?: [number, number]
  pinStyle?: Function
  mapHeight?: number
  popupType?: 'sidebar' | 'popover'
  hasSidePanel?: boolean
  noresults?: boolean
  getFeatureTitle?: (feature: any) => string
  clusteringDistance?: number
}

const props = withDefaults(defineProps<Props>(), {
  closeOnMapClick: true,
  projection: 'EPSG:4326',
  features: () => [],
  initialZoom: 7.3,
  mapHeight: 600,
  popupType: 'sidebar',
  hasSidePanel: false,
  initialCenter: () => [144.9631, -36.8136], // melbourne CBD
  homeViewExtent: () => [144.9631, -36.8136], // melbourne CBD
  pinStyle: (feature) => {
    let color = feature.color || primaryColor || 'red'
    const ic = new Icon({
      src: markerIconDefaultSrc,
      color,
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction'
    })
    ic.load()
    return ic
  },
  noresults: false,
  getFeatureTitle: (feature: any) => (feature ? feature.title : ''),
  clusteringDistance: 100
})

const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const { setRplMapRef, popup, deadSpace, defaultExtent } =
  inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)

onMounted(() => {
  setRplMapRef(mapRef.value.map)
})

onUnmounted(() => {
  setRplMapRef(null)
})

const activatePin = (featureProperties, coordinates, zoom) => {
  const map = mapRef.value.map

  const pinStyle = props.pinStyle(featureProperties)
  const pinColor =
    typeof pinStyle === 'string' ? pinStyle : pinStyle?.getColor()

  popup.value.feature = [featureProperties]
  popup.value.color = asString(pinColor)
  popup.value.isOpen = true
  popup.value.isArea = false

  popup.value.position = coordinates

  centerMap(map, coordinates, zoom, deadSpace.value, props.popupType)
}

defineExpose({
  activatePin
})

const center = computed(() => {
  if (props.projection === 'EPSG:3857') {
    return fromLonLat(props.initialCenter)
  } else {
    return props.initialCenter
  }
})

const selectedPinStyle = (feature, style) => {
  const ic = new Icon({
    src: markerIconSelectedSrc,
    color: popup.value.color,
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction'
  })
  ic.load()
  style.setImage(ic)
  return style
}

const { isFullscreen } = useFullscreen()

const { onHomeClick, onZoomInClick, onZoomOutClick, onFullScreenClick } =
  useMapControls(mapRef)

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

async function onMapSingleClick(evt) {
  onNoResultsDismiss()

  const map = mapRef.value.map
  const point = getfeaturesAtMapPixel(map, evt.pixel)
  const largeClusterZoomAmount = 4 // Zoom levels to zoom in
  const largeClusterZoomLimit = 100 // Feature count at which to apply cluster zoom behaviour
  const clusterZoomOutLimit = 9 // Level at which to apply cluster zoom behaviour
  if (point && point.features) {
    if (point.features.length > 1) {
      popup.value.isOpen = false
      const view = map.getView()
      const currentZoom = view.getZoom()
      // click on the cluster
      if (
        point.features.length > largeClusterZoomLimit &&
        currentZoom < clusterZoomOutLimit
      ) {
        // if there are lots of features and we are zoomed out, we just zoom in a bit
        view.animate({
          zoom: view.getZoom() + largeClusterZoomAmount,
          center: evt.coordinate
        })
      } else {
        const isCloseTogether = areFeaturesCloseTogether(point.features, 20)

        if (isCloseTogether) {
          // if the features are very close together/in the same location we show them all in an accordion in a popup
          const coords = point.features[0].getGeometry().flatCoordinates

          popup.value.feature = point.features.map((f) => f.getProperties())
          popup.value.position = coords
          popup.value.isOpen = true
          popup.value.isArea = true

          // Zoom in on the cluster icon
          centerMap(map, coords, undefined, deadSpace.value, props.popupType)
        } else {
          // otherwise we zoom to the extent of the cluster
          await nextTick()
          zoomToClusterExtent(
            point.features,
            popup,
            map,
            props.projection,
            deadSpace.value
          )
        }
      }
    } else if (point.features.length === 1) {
      // if we click on a pin we open the popup
      const clickedFeature = point.features[0]
      const coordinates = clickedFeature.getGeometry().flatCoordinates
      const featureProperties = clickedFeature.getProperties()

      activatePin(featureProperties, coordinates, null)
    }
  }

  if (!point || !point.features || point.features.length === 0) {
    popup.value.isOpen = false
  }
}

function onMapMove(evt) {
  const map = mapRef.value.map
  const canvas: HTMLCanvasElement | null =
    document.querySelector('.rpl-map canvas')
  if (map && canvas) {
    const point = getfeaturesAtMapPixel(map, evt.pixel)

    if (point && point.features) {
      canvas.style.cursor = 'pointer'
      const pinTitle =
        point.features.length === 1
          ? props.getFeatureTitle(point.features[0].getProperties())
          : ''

      // if there is only one feature, set the title attribute to the feature title
      if (pinTitle) {
        canvas.setAttribute('title', pinTitle)
      }
    } else {
      canvas.style.cursor = 'default'

      // clear the title attribute
      canvas.setAttribute('title', '')
    }
  }
}

function handleHomeClick() {
  onHomeClick()
  onPopUpClose()
}

const hideNoResults = ref(false)

function onNoResultsDismiss() {
  hideNoResults.value = true
}
// reset dismiss state when another query happens
watch(
  () => props.noresults,
  (newNoResultsVal) => {
    if (newNoResultsVal === true && hideNoResults.value === true) {
      hideNoResults.value = false
    }
  }
)

onMounted(() => {
  if (mapRef.value?.map) {
    mapRef.value.map.getControls().forEach((control) => {
      if (control instanceof Zoom) {
        mapRef.value?.map.removeControl(control)
      }
    })
  }
  fitDefaultExtent(mapRef.value.map, deadSpace.value, defaultExtent)
})

const noResultsRef = ref(null)
</script>

<template>
  <slot
    v-if="hasSidePanel && $slots.sidepanelMobile"
    name="sidepanelMobile"
    :mapHeight="mapHeight"
    :selectedFeatures="popup.feature"
  />
  <div
    :class="{
      'rpl-map': true,
      'rpl-map--has-sidepanel': hasSidePanel
    }"
  >
    <div
      v-if="noresults && !hideNoResults && !hasSidePanel"
      ref="noResultsRef"
      class="rpl-map__noresults"
    >
      <button
        title="dismiss no results message"
        class="rpl-map__noresults-cancel"
        @click="onNoResultsDismiss"
      >
        <RplIcon name="icon-cancel" size="xs"></RplIcon>
      </button>
      <slot name="noresults">
        <p class="rpl-type-h4-fixed">Sorry, no results match your search.</p>
        <p class="rpl-type-p-small">
          Try again with different search options or check back later.
        </p>
      </slot>
    </div>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="false"
      :loadTilesWhileInteracting="false"
      class="rpl-map__map"
      :style="`height: ${mapHeight}px`"
      @singleclick="onMapSingleClick"
      @pointermove="onMapMove"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
        :minZoom="5"
      />
      <slot name="map-provider"> </slot>
      <slot
        name="shapes"
        :mapFeatures="mapFeatures && mapFeatures.length > 0"
      ></slot>

      <!-- This enlarged pin is rendered for the sidebar/fixed popup style only -->
      <ol-vector-layer
        v-if="
          (popupType === 'sidebar' || popupType === 'sidepanel') &&
          popup.isOpen &&
          popup.position &&
          popup.feature?.length === 1
        "
        :zIndex="5"
      >
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="popup.position"></ol-geom-point>
            <ol-style :overrideStyleFunction="selectedPinStyle"></ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-vector-layer v-if="mapFeatures && mapFeatures.length > 0">
        <slot name="features" :features="mapFeatures">
          <ol-animated-clusterlayer
            title="clusterLayer"
            :animationDuration="300"
            :distance="clusteringDistance"
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
          <RplIcon v-if="isFullscreen" name="icon-cancel"></RplIcon>
          <RplIcon v-else name="icon-enlarge" size="m"></RplIcon>
        </button>
      </div>
      <div class="rpl-map__control rpl-map__control-home">
        <button title="Centre map" @click="handleHomeClick">
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

      <slot
        v-if="hasSidePanel && $slots.sidepanel"
        name="sidepanel"
        :mapHeight="mapHeight"
      />

      <slot
        v-if="popupType === 'sidebar'"
        name="sidebar"
        :popupIsOpen="popup.isOpen"
        :mapHeight="mapHeight"
      >
        <RplMapPopUp
          :is-open="popup.isOpen"
          :is-area="popup.isArea"
          :type="popupType"
          :pinColor="popup.color"
          :mapHeight="mapHeight"
          @close="onPopUpClose"
        >
          <template #header>
            <slot name="popupTitle" :selectedFeatures="popup.feature">
              {{ popup.feature[0].title }}
            </slot>
          </template>
          <slot name="popupContent" :selectedFeatures="popup.feature">
            <p class="rpl-type-p-small">
              {{ popup.feature[0].description }}
            </p>
          </slot>
        </RplMapPopUp>
      </slot>
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
