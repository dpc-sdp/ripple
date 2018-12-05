<template>
  <rpl-map
    :center="center"
    :zoom="zoom"
    :customThemeFunction="themeFeatureStyleFunction"
    themeLayerUrl="https://myvic-app-dev-gis.beta.vic.gov.au/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=myvic:public_wifi&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}">
  </rpl-map>
</template>

<script>
import Vue from 'vue'
import RplMap from '@dpc-sdp/ripple-map'

const ol = Vue.ol

export default {
  name: 'RplWifiMap',
  components: {
    RplMap
  },
  props: {
    center: {
      type: Array,
      default: () => [16139009.49495, -4551340.1913],
      validator: value => value.length === 2
    },
    zoom: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      // ...
    }
  },
  methods: {
    themeFeatureStyleFunction (feature, resolution) {
      let size = [8, 8]
      const activeColor = '#1caadd'
      const futureColor = 'pink'
      const activeOutlineColor = 'black'
      const futureOutlineColor = 'black'
      const type = feature.get('legend') || ''

      if (type.toLowerCase() === 'station') {
        let rectangleSvgDefinition = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 8 8"><style>.st0{fill:${activeColor};stroke:${activeOutlineColor}}.st1{fill:${activeOutlineColor}}</style><rect width="10" height="10" class="st0"/></svg>`)
        return this.createImageIconStyle(rectangleSvgDefinition, 'anonymous', size)
      } else if (type.toLowerCase() === 'future') {
        let futurePointSvgDefinition = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 8 8"><style>.st0{fill:${futureColor}}.st1{fill:${futureOutlineColor}}</style><circle cx="4" cy="4" r="3.8" class="st0"/><path d="M4 8C1.8 8 0 6.2 0 4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM4 .5C2.1.5.5 2.1.5 4S2.1 7.5 4 7.5 7.5 5.9 7.5 4 5.9.5 4 .5z" class="st1"/></svg>`)
        return this.createImageIconStyle(futurePointSvgDefinition, 'anonymous', size)
      } else {
        let pointSvgDefinition = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 8 8"><style>.st0{fill:${activeColor}}.st1{fill:${activeOutlineColor}}</style><circle cx="4" cy="4" r="3.8" class="st0"/><path d="M4 8C1.8 8 0 6.2 0 4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM4 .5C2.1.5.5 2.1.5 4S2.1 7.5 4 7.5 7.5 5.9 7.5 4 5.9.5 4 .5z" class="st1"/></svg>`)
        return this.createImageIconStyle(pointSvgDefinition, 'anonymous', size)
      }
    },
    createImageIconStyle: (src, crossOrigin, size) => {
      return new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
          crossOrigin,
          src,
          imgSize: size
        }))
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-wifi-map {
    // Add styles
  }
</style>
