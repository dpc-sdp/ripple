<template>
  <ClientOnly>
    <RplMap
      :id="123"
      :features="features"
      ref="rplmap"
      projection="EPSG:3857"
      popupType="popover"
      :map-height="550"
      :pinStyle="pinStyle"
    >
      <template #map-provider>
        <rpl-map-provider-vic-map />
      </template>
      <template v-if="vectorLayerComponent" #shapes>
        <component :is="vectorLayerComponent" :results="results"></component>
      </template>
      <template #popupTitle="{ selectedFeatures }">
        <span v-if="selectedFeatures.length === 1">
          <component
            :is="popup.title.component"
            v-if="popup.title.component"
            :selectedFeature="selectedFeatures[0]"
          ></component>
          <span v-else-if="popup.title.objKey">
            {{ getTitle(selectedFeatures[0]) }}
          </span>
        </span>
        <template v-if="selectedFeatures.length > 1">
          {{ selectedFeatures.length }} items found in this area
        </template>
      </template>
      <template #popupContent="{ selectedFeatures }">
        <component
          :is="popup.content.component"
          v-if="selectedFeatures && popup.content.component"
          :selectedFeature="selectedFeatures"
        ></component>
      </template>
    </RplMap>
  </ClientOnly>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'

type TideSearchListingMapFeature = {
  lat: Number
  lng: Number
  id: string
}

interface Props {
  popup: {
    title: {
      objKey?: string
      component?: string
    }
    content: {
      objKey?: string
      component?: string
    }
  }
  latObjPath: string
  lngObjPath: string
  titleObjPath: string
  results: TideSearchListingMapFeature[]
  vectorLayerComponent?: string | undefined
  pinIconFn?: string | undefined
}

const props = withDefaults(defineProps<Props>(), {
  latObjPath: '_source.lat[0]',
  lngObjPath: '_source.lng[0]',
  titleObjPath: '_source.title[0]',
  vectorLayerComponent: undefined,
  pinIconFn: 'defaultPinStyleFn'
})

const appConfig = useAppConfig()
const pinStyleFunctions = appConfig?.ripple?.search?.mapPinStyleFn
const pinStyle = ref()
if (pinStyleFunctions && pinStyleFunctions.hasOwnProperty(props.pinIconFn)) {
  pinStyle.value = pinStyleFunctions[props.pinIconFn]
}

const getClusteredFeatures = (itms) => {
  return itms.map((itm) => {
    return {
      id: itm.id,
      title: itm[props.popup.title.objKey],
      content: itm[props.popup.content.objKey]
    }
  })
}
const rplmap = ref()

function getTitle(feature) {
  return get(feature, props.titleObjPath)
}

const features = computed(() => {
  return props.results.filter((itm) => itm.lat && itm.lng)
})
// const mappedAreas = computed(() => {
//   return props.areas
//     .map((area) => area.field_postcode && `'${area.field_postcode[0]}'`)
//     .filter((itm) => itm)
// })
// const shapeFormat = new GeoJSON()

// const areaUrl = computed(() => {
//   const baseArcGISURL =
//     'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/14/query'
//   const query = `postcode IN (${mappedAreas.value.join(',')})`
//   const inSR = '4326'
//   return `${baseArcGISURL}?where=${query}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=3857&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=postcode&returnGeometry=true&returnCentroid=false&f=pgeojson&token=`
// })
</script>

<style>
.tide-search-results-grid-item {
  display: flex;
}
</style>
