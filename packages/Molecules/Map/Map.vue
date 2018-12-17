<template>
  <div>
    <div
      id="map-popup"
      class="ol-popup">
        <rpl-map-indicator :selectedFeature="feature">
          <slot :selectedFeature="feature" />
        </rpl-map-indicator>
    </div>
    <div class="rpl-map" id="map" ref="map">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import RplMapIndicator from '@dpc-sdp/ripple-map-indicator'

let map,
  baseLayer,
  baseSource,
  themeLayer,
  themeSource,
  popupOverlay

const ol = Vue.ol

const methods = {
  createMap () {
    map = new ol.Map({
      target: 'map',
      controls: [
        new ol.control.Zoom()
      ],
      // interactions: interactions,
      loadTilesWhileInteracting: true,
      view: new ol.View({
        center: this.center,
        zoom: this.zoom,
        // maxZoom: 14,
        minZoom: 7
      })
    })
  },
  createBaseLayer () {
    baseSource = new ol.source.XYZ({
      url: this.basemapUrl,
      transition: 1000
    })
    baseLayer = new ol.layer.Tile({
      source: baseSource
    })
  },
  createImageIconStyle: (src, crossOrigin, size) => {
    return new ol.style.Style({
      image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
        crossOrigin,
        src,
        imgSize: size
      }))
    })
  },
  createThemeLayer () {
    if (!this.themeLayerUrl) return
    themeSource = new ol.source.VectorTile({
      overlaps: false,
      format: new ol.format.MVT(),
      url: this.themeLayerUrl,
      transition: 1000
    })

    if (!this.customThemeFunction) return
    themeLayer = new ol.layer.VectorTile({
      style: this.customThemeFunction || this.themeFeatureStyleFunction,
      opacity: 0.9,
      source: themeSource,
      updateWhileInteracting: true
    })
  },
  addPopupOverlay () {
    popupOverlay = new ol.Overlay({
      element: document.getElementById('map-popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      position: undefined
    })
    map.addOverlay(popupOverlay)
  },
  onMapClick (evt) {
    let feature =
        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          if (layer === themeLayer) {
            return feature
          }
        })
    if (!feature) {
      // hide popup if you click on the map
      this.feature = null
      return
    }

    this.feature = feature

    // wait until popup rendering is complete before positioning the elemtent
    // this means the popup height is now known, so the map will pan correctly
    this.$nextTick(function () {
      popupOverlay.setPosition(evt.coordinate)
    })
  },
  onAppMounted () {
    this.createMap()
    this.createBaseLayer()
    this.createThemeLayer()

    map.addLayer(baseLayer)
    if (themeLayer) map.addLayer(themeLayer)

    this.addPopupOverlay()

    map.on('singleclick', this.onMapClick)
  }
}
export default {
  name: 'RplMap',
  props: {
    // Fitzroy
    center: {
      type: Array,
      default: () => [16139009.49495, -4551340.1913],
      validator: value => value.length === 2
    },
    zoom: {
      type: Number,
      default: 15
    },
    refreshOn: {
      type: Boolean,
      default: false
    },
    themeLayerUrl: {
      type: String
    },
    basemapUrl: {
      type: String,
      required: true
    },
    customThemeFunction: {
      type: Function,
      default: null
    }
  },
  data: function () {
    return { feature: null }
  },
  components: {
    RplMapIndicator
  },
  watch: {
    // Used as a prop when the map will be offscreen initially i.e. mobile
    // OL will hide the canvas
    // Update size renders the map again
    refreshOn (val) {
      if (val) {
        map.updateSize()
        // TODO: Calling zoom works but zooms in too close on mobile
        // Update with mobile specific zoom level
        // this.zoomOnAppMounted()
      }
    },
    center (newCenter) {
      map.getView().setCenter(newCenter)
      map.getView().setZoom(this.zoom)
      this.feature = null
    },
    zoom (newZoom) {
      map.getView().setZoom(newZoom)
    }
  },
  mounted () {
    this.onAppMounted()
  },
  methods
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

.rpl-map {
  width: 100%;
  height: 350px;
}

.ol-popup {
  position: absolute;
  z-index: 999;
  width: 500px;
  bottom: 11px;
  left: -250px;
}
</style>
