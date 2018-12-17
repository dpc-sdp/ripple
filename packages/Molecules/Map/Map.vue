<template>
  <div class="rpl-map">
    <div
      id="map-popup"
      class="rpl-map__popup ol-popup"
      ref="mapPopup">
        <map-indicator :selectedFeature="feature" >
          <slot :selectedFeature="feature" />
        </map-indicator>
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
  themeSource,
  popupOverlay

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
    map.on('pointermove', (e) => {
      // set the cursor to a pointer when hovering over an icon
      var pixel = map.getEventPixel(e.originalEvent)
      var hit = map.hasFeatureAtPixel(pixel)
      this.$refs.map.style.cursor = hit ? 'pointer' : ''
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
  themeFeatureStyleFunction (feature, resolution) {
    let size = [12, 12]
    const COLORS = {
      ACTIVE: '#1caadd', // primary
      INACTIVE: '#ec4d82',
      FUTURE: '#465870', // dark neutral
      STATION: '#023b89' // dark primary
    }
    const LEGEND_TYPES = {
      Station: 'station',
      Future: 'future',
      Active: 'active'
    }
    const legend = feature.get('legend') || ''

    function pointSvgDefinition (fillColor, width, height) {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 8 8"><style>.st0{fill:${fillColor}}</style><circle cx="4" cy="4" r="3.8" class="st0"/></svg>`)
    }

    if (LEGEND_TYPES[legend] === 'station') {
      return this.createImageIconStyle(
        pointSvgDefinition(COLORS.STATION, size[0], size[1]),
        'anonymous',
        size
      )
    } else if (LEGEND_TYPES[legend] === 'future') {
      return this.createImageIconStyle(
        pointSvgDefinition(COLORS.FUTURE, size[0], size[1]),
        'anonymous',
        size
      )
    } else {
      return this.createImageIconStyle(
        pointSvgDefinition(COLORS.ACTIVE, size[0], size[1]),
        'anonymous',
        size
      )
    }
  },
  createThemeLayer () {
    themeSource = new ol.source.VectorTile({
      overlaps: false,
      format: new ol.format.MVT(),
      url: this.themeLayerUrl,
      transition: 1000
    })
    themeLayer = new ol.layer.VectorTile({
      style: this.customThemeFunction || this.themeFeatureStyleFunction,
      opacity: 0.9,
      source: themeSource,
      updateWhileInteracting: true
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
  zoomToArea (area, {duration}) {
    /*
    var featureRequest = new ol.format.WFS().writeGetFeature({
      srsName: 'EPSG:900913',
      featureNS: 'myvic',
      featurePrefix: 'myvic',
      featureTypes: ['suburb'],
      outputFormat: 'application/json'// ,
      // filter: ol.format.filter.equalTo('ssc_name', area, false)
    })
    fetch('https://myvic-app-dev-gis.beta.vic.gov.au/geoserver/myvic/wfs', {
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

    this.feature = this.featureMapper(feature)

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
    map.addLayer(themeLayer)

    this.addPopupOverlay()

    map.on('singleclick', this.onMapClick)
  },
  featureMapper (feature) {
    // map the feature to a { title, content } object
    const WIFI_STATUS = {
      UP: '#VicFreeWifi Access Point',
      FUTURE: 'Future Access Point'
    }
    // prefer long_name to name
    return {
      title: WIFI_STATUS[feature.get('status')],
      content: (feature.get('long_name') || feature.get('name')) + (feature.get('type') ? ` (${feature.get('type')})` : '')
    }
  }
}

export default {
  name: 'RplMap',
  props: {
    data: Object,
    // Default center is the center of Victoria
    center: {
      type: Array,
      default: () => [ 16121779.620932763, -4389253.766980502 ],
      validator: value => value.length === 2
    },
    zoom: {
      type: Number,
      default: 7
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
    MapIndicator
  },
  watch: {
    // Used as a prop when the map will be offscreen initially i.e. mobile
    // OL will hide the canvas
    // Update size renders the map again
    refreshOn (val) {
      if (val) {
        map.updateSize()
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

$rpl-map-popup-width: 300px;

.rpl-map {
  &__map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    cursor: grab;

    @include rpl_mobile_padding;

    @include rpl_breakpoint(m) {
      padding-left: 0;
      padding-right: 0;
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
    z-index: 999;
    width: $rpl-map-popup-width;
    bottom: 11px;
    left: $rpl-map-popup-width / 2 * -1;
    cursor: auto;
  }
}
</style>
