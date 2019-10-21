<template>
  <div class="tide-map">
    <h2 v-if="title"
      class="tide-map__title">{{title}}</h2>
    <RplMarkup
      v-if="description"
      :html="description" />
    <pre v-if="err">
      {{err}}
    </pre>
    <p class="rpl-visually-hidden">
      The following is an interactive map component, showing free WiFi access points across Victoria - in Melbourne CBD, Ballarat, and Bendigo. The CBD has access points along major roads and in train stations, Bendigo in its town centre and Ballarat in the town centre and surrounding Lake Wendouree.
    </p>
    <tide-map-tablist
      title="<strong>#VicFreeWiFi</strong> Coverage Map"
      :tabs="tabs"
      @update="updateTab" />
    <rpl-map
      role="tabpanel"
      :center="getCenter"
      :zoom="getZoom"
      :baseMapUrl="baseMapUrl"
      :customMethods="customMethods"
      :minZoom="6"
      />
  </div>
</template>

<script>
// This component is referenced by the Data-Driven Component
// from Drupal, used for now to display the Free Wifi map.
// Props set in ~/modules/nuxt-tide-landing-page/lib/config/tide.config.js
import RplMarkup from '@dpc-sdp/ripple-markup'
import TideMapTablist from './TideMapTablist'
import { RplMap } from '@dpc-sdp/ripple-map'
import ol from '@dpc-sdp/ripple-map/lib/ol'

const { createImageIconStyle } = ol

const melbourne = [16136905.843820328, -4553057.013522999]
const ballarat = [16013011.06143553, -4516445.302446402]
const bendigo = [16061229.95186071, -4405569.803992475]
const coordinates = [melbourne, ballarat, bendigo]
const zoom = [14, 14, 14]
const baseMapUrl = 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
const fontSizeInPx = '3.7'

const getColor = legend => {
  const COLORS = {
    ACTIVE: '#0095ec',
    INACTIVE: '#ec4d82',
    FUTURE: '#96989a',
    STATION: '#003b8c'
  }
  switch (legend) {
    case 'Station': return COLORS.STATION
    case 'Future': return COLORS.FUTURE
    default: return COLORS.ACTIVE
  }
}

const styleSinglePoint = (feature, size) => {
  // NOTE: the whitespace in the <text> element is
  // important: `>${clusterSizeText}</text>`
  // IE doesn't trim all the whitespace and it leads
  // to off-center text

  const featureColor = getColor(feature.get('legend'))

  return 'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 8 8">
        <circle
          fill="${featureColor}"
          stroke-width="1"
          cx="4"
          cy="4"
          r="3.8"/>
        <text
          x="50%"
          y="50%"
          dy="1.25"
          text-anchor="middle"
          fill="#FFFFFF"
          style="font-size:${fontSizeInPx}px;
            font-weight: bold;
            font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
        ></text>
      </svg>
    `)
}

const styleCluster = (features, size) => {
  const clusterSizeText = features.length > 99 ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>` : features.length.toString()
  const clusterTheme = '#999'

  // NOTE: the whitespace in the <text> element is
  // important: `>${clusterSizeText}</text>`
  // IE doesn't trim all the whitespace and it leads
  // to off-center text
  return 'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 8 8">
        <circle
          stroke="${clusterTheme}"
          fill="#ffffff"
          stroke-width="1"
          cx="4"
          cy="4"
          r="3.5"/>
        <text
          x="50%"
          y="50%"
          dy="1.25"
          text-anchor="middle"
          fill="${clusterTheme}"
          style="font-size:${fontSizeInPx}px;
            font-weight: bold;
            font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
        >${clusterSizeText}</text>
      </svg>
    `)
}

const customMethods = {
  themeFeatureStyleFunction: (feature, resolution) => {
    const features = feature.get('features')
    const size = 30

    if (features.length > 1) {
      return [createImageIconStyle(
        styleCluster(features, size),
        'anonymous',
        [size, size]
      )]
    }

    return [createImageIconStyle(
      styleSinglePoint(features[0], size),
      'anonymous',
      [size, size]
    )]
  },

  createThemeLayer: ol => {
    const isIE = (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))

    const themeSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent => `https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=myvic:public_wifi&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join()},EPSG:3857`,
      strategy: ol.loadingstrategy.bbox
    })

    const clusterSource = new ol.source.ClusterSource({
      source: themeSource,
      distance: 40
    })

    if (isIE) {
      // internet explorer throws an error when using AnimatedCluster
      return new ol.layer.Vector({
        source: clusterSource,
        style: customMethods.themeFeatureStyleFunction
      })
    }

    return new ol.source.AnimatedCluster({
      animationDuration: 600,
      source: clusterSource,
      style: customMethods.themeFeatureStyleFunction
    })
  },

  featureMapper: (feature) => {
    const features = feature.get('features')

    const WIFI_STATUS = {
      UP: '#VicFreeWifi Access Point',
      FUTURE: 'Future Access Point'
    }

    const generateLinesForFeature = f => {
      return ('<p>' + (f.get('long_name') || f.get('name')) + (f.get('type') ? ` (${f.get('type')})` : '') + '</p>')
    }

    if (features.length === 1) {
      return {
        title: WIFI_STATUS[features[0].get('status')],
        content: generateLinesForFeature(features[0])
      }
    }

    return [
      {
        title: `${features.length} Access Points found in this area`
      },
      ...features.map((f, index) => {
        return {
          title: WIFI_STATUS[f.get('status')] || 'what',
          content: generateLinesForFeature(f)
        }
      })
    ]
  }
}

export default {
  name: 'TideVicFreeWifiMap',
  props: {
    title: String,
    description: String
  },
  components: {
    RplMarkup,
    TideMapTablist,
    RplMap
  },
  data: function () {
    return {
      activeTab: 0,
      tabs: ['Melbourne', 'Ballarat', 'Bendigo'],
      baseMapUrl,
      customMethods,
      err: null
    }
  },
  computed: {
    getCenter () {
      return coordinates[this.activeTab]
    },
    getZoom () {
      return zoom[this.activeTab]
    }
  },
  methods: {
    updateTab (newActiveTabIndex) {
      this.activeTab = newActiveTabIndex
    }
  }
}
</script>
