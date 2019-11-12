<template>
  <div class="rpl-map">
    <div
      id="map-popup"
      class="rpl-map__popup ol-popup"
      ref="mapPopup">
      <map-indicator
        :selectedFeature="feature"
        :mapElement="$refs.map" />
    </div>
    <div class="rpl-map__container">
      <div class="rpl-map__map" id="map" ref="map">
      </div>
    </div>
  </div>
</template>

<script>
import MapIndicator from './MapIndicator'
import ol from './lib/ol'

let map,
  baseLayer,
  baseSource,
  themeLayer,
  popupOverlay

/**
 * All of these functions can be overridden by passing in
 * functions of the same name as properties of the customMethods prop
 *
 * const myMethods = {
 *    themeFeatureStyleFunction (feature, resolution) {
 *      return new ol.style.Style({})
 *    }
 * }
 * <rpl-map :customMethods="myMethods" />
 */
const methods = {
  createMap () {
    map = new ol.Map({
      target: 'map',
      controls: [
        new ol.control.Zoom()
      ],
      view: new ol.View({
        center: this.center,
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom
      })
    })
    map.on('pointermove', (e) => {
      // set the cursor to a pointer when hovering over an icon
      var pixel = map.getEventPixel(e.originalEvent)
      var hit = map.hasFeatureAtPixel(pixel)
      this.$refs.map.style.cursor = hit ? 'pointer' : ''
    })
  },
  createBaseLayer () {
    baseSource = new ol.source.XYZ({
      url: this.baseMapUrl,
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
  themeFeatureStyleFunction (feature, resolution) {
    let size = [12, 12]

    function pointSvgDefinition (fillColor, width, height) {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 8 8"><style>.st0{fill:${fillColor}}</style><circle cx="4" cy="4" r="3.8" class="st0"/></svg>`)
    }

    return this.createImageIconStyle(
      pointSvgDefinition('#1caadd', size[0], size[1]),
      'anonymous',
      size
    )
  },
  createThemeLayer () {
    const themeSource = new ol.source.VectorTileSource({
      overlaps: false,
      format: new ol.format.MVT(),
      url: this.themeLayerUrl,
      transition: 0
    })
    themeLayer = new ol.layer.VectorTile({
      style: (this.customMethods && this.customMethods.themeFeatureStyleFunction) ? this.customMethods.themeFeatureStyleFunction : this.themeFeatureStyleFunction,
      opacity: 1,
      source: themeSource,
      renderMode: 'vector'
    })
  },
  addPopupOverlay () {
    popupOverlay = new ol.Overlay({
      element: this.$refs.mapPopup,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      position: undefined
    })
    map.addOverlay(popupOverlay)
  },
  zoomToArea (area, { duration }) {
    /*
    var featureRequest = new ol.format.WFS().writeGetFeature({
      srsName: 'EPSG:900913',
      featureNS: 'myvic',
      featurePrefix: 'myvic',
      featureTypes: ['suburb'],
      outputFormat: 'application/json'// ,
      // filter: ol.format.filter.equalTo('ssc_name', area, false)
    })
    fetch('https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/myvic/wfs', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest)
    }).then((response) => {
      return response.json()
    }).then((json) => {
      var features = new ol.format.GeoJSON().readFeatures(json)
      if (features.length > 0) {
        let feature = features[0]
        map.getView().fit(feature.getGeometry().getExtent(), {
          size: map.getSize(),
          duration: duration
        })
      }
    })
    */
  },
  zoomOnAppMounted () {
    // Do something like `this.zoomToArea()`
  },
  onMapClick (evt) {
    const features = []
    map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
      if (layer === themeLayer) features.push(f)
    })

    if (features.length === 0) {
      // hide popup if you click on the map
      this.feature = null
      return
    }

    const firstFeature = features[0]

    this.feature = (this.customMethods && this.customMethods.featureMapper) ? this.customMethods.featureMapper(firstFeature, features) : this.featureMapper(firstFeature, features)

    // Wait until popup rendering is complete before positioning the element
    // this means the popup height is now known, so the map will pan correctly.
    // Here we use setTimeout instead of Vue's nextTick because it should wait
    // for the browser to update the size of the popup based on content length
    // and screen size. With nextTick, the setPosition was running before the
    // overlay changed size.
    setTimeout(function () {
      popupOverlay.setPosition(firstFeature.getGeometry().getCoordinates())
    }, 0)
  },
  onAppMounted () {
    this.createMap()

    if (this.customMethods && this.customMethods.createBaseLayer) {
      baseLayer = this.customMethods.createBaseLayer(ol)
    } else {
      this.createBaseLayer()
    }

    if (this.customMethods && this.customMethods.createThemeLayer) {
      themeLayer = this.customMethods.createThemeLayer(ol)
    } else {
      this.createThemeLayer()
    }

    map.addLayer(baseLayer)
    map.addLayer(themeLayer)

    this.addPopupOverlay()

    map.on('singleclick', this.onMapClick)

    this.zoomOnAppMounted()
  },
  featureMapper (feature) {
    // this function should be overridden when consuming this component,
    // to allow customisation of the pop content
    return {
      title: feature.get('title'),
      content: feature.get('content')
    }
  }
}

export default {
  name: 'RplMap',
  props: {
    // Default center/zoom on state of Victoria
    center: {
      type: Array,
      default: () => [16136905.843820328, -4383057.013522999],
      validator: value => value.length === 2
    },
    zoom: {
      type: Number,
      default: 7
    },
    maxZoom: {
      type: Number,
      default: 20
    },
    minZoom: {
      type: Number,
      default: 1
    },
    refreshOn: {
      type: Boolean,
      default: false
    },
    themeLayerUrl: {
      type: String
    },
    baseMapUrl: {
      type: String,
      required: true
    },
    customThemeFunction: {
      type: Function,
      default: null
    },
    customMethods: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return { feature: null }
  },
  components: {
    MapIndicator
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
        this.zoomOnAppMounted()
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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  // The map should be displayed in a 16:9 aspect ratio
  // Accomplished using this technique:
  // https://css-tricks.com/aspect-ratio-boxes/
  // But we can't use the technique on .rpl-map itself, because
  // OpenLayers uses .rpl-map's height value to draw the map.
  // height: 0 means no map at all. By setting height: 0 and
  // padding-top: (9/16)% on .rpl-map__container, the map
  // itself can be height auto which OL picks up correctly.

  $rpl-map-aspect-ratio: (
    xs: (8/10) * 100%,
    s: (9/16) * 100%
  );

  $rpl-map-popup-width: rem(300px) !default; // consider increasing this

  .rpl-map {
    &__map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      cursor: grab;

      @include rpl_print {
        // Change to auto otherwise it won't got printable.
        width: auto;
        height: auto;
      }
    }

    &__container {
      position: relative;
      height: 0;
      // https://css-tricks.com/aspect-ratio-boxes/
      @each $bp, $val in $rpl-map-aspect-ratio {
        @include rpl_breakpoint($bp) {
          padding-top: $val;
        }
      }
    }

    &__popup {
      position: absolute;
      z-index: $rpl-zindex-popover;
      bottom: $rpl-space-3;
      transform: translateX(-50%);
      cursor: auto;
    }
  }
</style>
