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
      The following is an interactive map component, showing the rough location of programs being run in support of the Prevention of Family Violence initiative.
    </p>
    <rpl-map
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
import { RplMap } from '@dpc-sdp/ripple-map'
import ol from '@dpc-sdp/ripple-map/lib/ol'
const { doFeaturesShareSameLocation, createImageIconStyle } = ol

const baseMapUrl = 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'

const themeColor = '#86229b'

const customMethods = {
  themeFeatureStyleFunction: (feature, resolution) => {
    const features = feature.get('features')
    const size = 30
    const fontSizeInPx = '3.7'
    const clusterSize = features.length
    const clusterSizeText = clusterSize > 99 ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>` : clusterSize.toString()
    const isCluster = !doFeaturesShareSameLocation(features)

    function clusterSvgDefinition () {
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
              stroke="${themeColor}"
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
              fill="${themeColor}"
              style="font-size:${fontSizeInPx}px;
                font-weight: bold;
                font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
            >${clusterSizeText}</text>
          </svg>
        `)
    }

    function pointSvgDefinitionWithNumber () {
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
              fill="${themeColor}"
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
            >${clusterSizeText}</text>
          </svg>
        `)
    }

    if (isCluster) {
      return [createImageIconStyle(
        clusterSvgDefinition(),
        'anonymous',
        [size, size]
      )]
    }

    return [createImageIconStyle(
      pointSvgDefinitionWithNumber(),
      'anonymous',
      [size, size]
    )]
  },

  createThemeLayer: ol => {
    const isIE = (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))

    const themeSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent => `https://myvic-app-dev-gis.beta.vic.gov.au/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=myvic:family_violence&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join()},EPSG:3857`,
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

    const generateLinesForFeature = f => {
      const lines = []
      if (f.get('program_name')) lines.push(`<p><em>${f.get('program_name')}</em></p>`)
      if (f.get('providing_agency')) lines.push(`<p>Provided by ${f.get('providing_agency')}</p>`)
      if (f.get('overview_initiative')) lines.push(`<p>${f.get('overview_initiative')}</p>`)
      if (f.get('council_name')) lines.push(`<p>Delivered in ${f.get('council_name')}</p>`)
      if (f.get('agency_public_content_web')) lines.push(`<p><a class="map-indicator__link" target="_blank" href="${f.get('agency_public_content_web')}">Find out more</a></p>`)
      return lines
    }

    if (features.length === 1) {
      return {
        title: features[0].get('project_name'),
        content: generateLinesForFeature(features[0]).join('')
      }
    }

    return [
      {
        title: `${features.length} projects found in this area`
      },
      ...features.map((f, index) => {
        return {
          title: f.get('project_name') || 'Untitled Project',
          content: generateLinesForFeature(f).join('')
        }
      })
    ]
  }
}

export default {
  name: 'TideMapPreventionFamilyViolence',
  props: {
    title: String,
    description: String
  },
  components: {
    RplMarkup,
    RplMap
  },
  data: function () {
    return {
      baseMapUrl,
      customMethods,
      err: null
    }
  },
  computed: {
    // getCenter () {
    //   return coordinates[this.activeTab]
    // },
    // getZoom () {
    //   return zoom[this.activeTab]
    // }
  },
  async mounted () {
    // TODO: Set fetch options based on Drupal field
    //   const requestSource = 'gis'
    //   const requestName = 'wifimap'
    //   try {
    //     const data = await fetchDataFromExternalSource({
    //       requestSource,
    //       requestName
    //     })
    //     console.log('external data', data)
    //     this.data = data
    //   } catch (err) {
    //     console.log('Error fetching external data', err)
    //     this.err = 'Error fetching external data\n' + err.toString()
    //   }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .tide-map {
    &__title {
      @include rpl_mobile_padding;

      @include rpl_breakpoint(m) {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

</style>
