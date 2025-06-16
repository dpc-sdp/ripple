<script lang="ts">
let mapAccentColor: string = ''
</script>

<script setup lang="ts">
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import type { IRplMapFeature, IRplMapLayer } from './../../types'
import {
  onMounted,
  onUnmounted,
  ref,
  inject,
  computed,
  watch,
  nextTick
} from 'vue'
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
import RplMapLayerList from './../layer-list/RplMapLayerList.vue'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import markerIconSelectedSrc from './../feature-pin/icon-pin-selected.svg?url'
import useMapControls from './../../composables/useMapControls.ts'
import {
  getfeaturesAtMapPixel,
  zoomToClusterExtent,
  centerMap,
  fitDefaultExtent,
  areFeaturesCloseTogether,
  getFeaturesCenterPoint
} from './utils'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id?: string
  title?: string
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  initialZoom?: number
  maxZoom?: number
  initialCenter?: [number, number]
  pinStyle?: Function
  mapHeight?: number
  popupType?: 'sidebar' | 'popover'
  hasSidePanel?: boolean
  noresults?: boolean
  getFeatureTitle?: (feature: any) => string
  clusteringDistance?: number
  layerList?: IRplMapLayer[]
  selectedLayers?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  id: 'rpl-map',
  title: 'Interactive map',
  closeOnMapClick: true,
  projection: 'EPSG:4326',
  features: () => [],
  initialZoom: 7.3,
  maxZoom: undefined,
  mapHeight: 600,
  popupType: 'sidebar',
  hasSidePanel: false,
  initialCenter: () => [144.9631, -36.8136], // melbourne CBD
  homeViewExtent: () => [144.9631, -36.8136], // melbourne CBD
  pinStyle: (feature) => {
    let color = feature.color || mapAccentColor || 'red'
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
  clusteringDistance: 120,
  layerList: undefined,
  selectedLayers: () => []
})

const emit = defineEmits<{
  (e: 'updateSelectedLayers', payload: [value: string[]]): void
  (e: 'togglePopup', payload: rplEventPayload & { action: 'open' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map', emit)

const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)
const mapPosition = ref({})

const { setRplMapRef, popup, deadSpace, defaultExtent } =
  inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)

onMounted(() => {
  setRplMapRef(mapRef.value.map)

  mapAccentColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--rpl-clr-link'
  )
})

onUnmounted(() => {
  setRplMapRef(null)
})

const activatePin = (featureProperties, coordinates, zoom, trigger = 'pin') => {
  const map = mapRef.value.map

  const pinStyle = props.pinStyle(featureProperties)
  const pinColor =
    typeof pinStyle === 'string' ? pinStyle : pinStyle?.getColor()

  popup.value.feature = [featureProperties]
  popup.value.color = asString(pinColor)
  popup.value.trigger = trigger
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

const {
  onHomeClick,
  onZoomInClick,
  onZoomOutClick,
  onFullScreenClick,
  isFullScreen,
  supportsFullScreen
} = useMapControls(mapRef)

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
          zoom: currentZoom + largeClusterZoomAmount,
          center: evt.coordinate
        })
      } else {
        const isCloseTogether = areFeaturesCloseTogether(point.features, 20)

        if (isCloseTogether || currentZoom >= props.maxZoom) {
          // if the features are very close together/in the same location we show them all in an accordion in a popup
          const coords = getFeaturesCenterPoint(point.features)
          popup.value.feature = point.features.map((f) => f.getProperties())
          popup.value.position = coords
          popup.value.trigger = 'cluster'
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
  onPopUpClose()
  onHomeClick()
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

// watch the popup value and emit an event when it changes
watch(
  () => popup.value,
  (newPopup) => {
    if (newPopup.isOpen) {
      let title = popup.value?.title
      const features = Array.isArray(popup.value?.feature)
        ? popup.value.feature
        : [popup.value.feature]

      if (!title) {
        title = features.map((item: any) => props.getFeatureTitle(item))
        title = title.length === 1 ? title[0] : title
      }

      emitRplEvent(
        'togglePopup',
        {
          action: 'open',
          mode: popup.value?.trigger,
          label: title
        },
        { global: true }
      )
    }
  },
  {
    deep: true
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

const fullScreenLabel = computed(() =>
  isFullScreen.value ? 'Exit full screen' : 'View full screen'
)

const handleUpdateSelectedLayers = (newSelectedLayers: string[]) => {
  emit('updateSelectedLayers', newSelectedLayers)
}

// Try to construct a unique id for the currently active popup, this is needed for focus management
// Not all features have an id, and not all features have a set of coordinates
// A popup can also contain multiple features, so we join them together
const activePopupId = computed(() => {
  if (!popup.value?.feature || !popup.value?.feature?.length) {
    return null
  }

  const features = Array.isArray(popup.value?.feature)
    ? popup.value.feature
    : [popup.value.feature]

  const jointId = features.map((feature) => feature?.id).join('-')
  const fallbackPositionId = popup.value.position.join(',')

  return jointId ? jointId : fallbackPositionId
})

const trackMapPosition = ({ target }) => {
  mapPosition.value = {
    center: target.getCenter(),
    zoom: target.getZoom()
  }
}
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
    :data-center="mapPosition.center"
    :data-zoom="mapPosition.zoom"
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
    <p :id="`${id}-map-instructions`" class="rpl-u-visually-hidden">
      Use arrow keys to pan the map, and plus and minus keys to zoom in and out.
      You can also use the full screen, home and zoom control buttons to
      interact with the map. Note that some map features cannot be accessed
      using a keyboard.
    </p>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="false"
      :loadTilesWhileInteracting="false"
      class="rpl-map__map"
      :style="`height: ${mapHeight}px`"
      :aria-label="title"
      :aria-describedby="`${id}-map-instructions`"
      role="application"
      tabindex="0"
      @singleclick="onMapSingleClick"
      @pointermove="onMapMove"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
        :maxZoom="maxZoom"
        :minZoom="5"
        @change="trackMapPosition"
      />
      <slot name="map-provider"></slot>
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
            <ol-source-vector :features="mapFeatures"></ol-source-vector>
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
          :offset="[0, popup.isArea ? 6 : 8]"
        >
          <RplMapPopUp
            :featureId="activePopupId"
            :is-open="popup.isOpen"
            :is-area="popup.isArea"
            :type="popupType"
            :pinColor="popup.color"
            :mapHeight="mapHeight"
            :closeOnEscape="true"
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

      <RplMapLayerList
        v-if="layerList?.length"
        :layers="layerList"
        :selectedLayers="selectedLayers"
        @update="handleUpdateSelectedLayers"
      />

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
          :featureId="activePopupId"
          :is-open="popup.isOpen"
          :is-area="popup.isArea"
          :type="popupType"
          :pinColor="popup.color"
          :mapHeight="mapHeight"
          :closeOnEscape="true"
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

      <div
        v-if="supportsFullScreen"
        class="rpl-map__control rpl-map__control-fullscreen"
      >
        <button :title="fullScreenLabel" @click="onFullScreenClick">
          <RplIcon v-if="isFullScreen" name="icon-cancel"></RplIcon>
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
    </ol-map>
  </div>
</template>

<style src="./RplMap.css" />
