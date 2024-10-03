<template>
  <TideSearchListingResultsMapSkeleton v-if="initialising" />
  <ClientOnly>
    <RplMap
      v-if="!initialising"
      :id="123"
      ref="mapRef"
      :features="features"
      projection="EPSG:3857"
      :popupType="popupType"
      :map-height="height"
      :pinStyle="pinStyle"
      :noresults="noresults"
      :hasSidePanel="hasSidePanel"
      :getFeatureTitle="getTitle"
      :clusteringDistance="clusteringDistance"
      :maxZoom="maxZoom"
    >
      <template #noresults>
        <slot name="noresults"></slot>
      </template>

      <template #map-provider>
        <rpl-map-provider-vic-map />
      </template>

      <template v-if="vectorLayerComponent" #shapes>
        <component :is="vectorLayerComponent" :results="results"></component>
      </template>

      <template #popupTitle>
        <TideSearchListingResultsPopupTitle
          :popupConfig="popup"
          :titleObjPath="titleObjPath"
        />
      </template>

      <template #popupContent>
        <TideSearchListingResultsPopupContent
          :popupConfig="popup"
          :titleObjPath="titleObjPath"
        />
      </template>

      <template #sidepanel="{ mapHeight }">
        <slot
          name="sidepanel"
          :mapHeight="mapHeight"
          :activatePin="mapRef?.activatePin"
        />
      </template>

      <template #sidepanelMobile="{ selectedFeatures }">
        <slot
          name="sidepanelMobile"
          :activatePin="mapRef?.activatePin"
          :selectedFeatures="selectedFeatures"
        />
      </template>
    </RplMap>
    <RplMapLegend
      v-if="legendItems?.length > 0"
      class="rpl-u-margin-t-5"
      :title="legendTitle"
      :items="legendItems"
      :defaultExpanded="legendExpanded"
    />
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
  popupType?: 'popover' | 'sidebar'
  popup: {
    title: {
      component?: string
    }
    content: {
      component?: string
    }
  }
  titleObjPath: string
  results: TideSearchListingMapFeature[]
  vectorLayerComponent?: string
  pinIconFn?: string
  legendTitle?: string
  legendExpanded?: boolean
  legendItems?: {
    text: string
    icon?: string
    iconColour?: string
  }[]
  noresults?: boolean
  hasSidePanel?: boolean
  initialising?: boolean
  clusteringDistance?: number
  maxZoom?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  popupType: 'popover',
  titleObjPath: '_source.title[0]',
  vectorLayerComponent: undefined,
  pinIconFn: 'defaultPinStyleFn',
  legendTitle: 'Key',
  legendExpanded: false,
  legendItems: () => [],
  noresults: false,
  hasSidePanel: false,
  initialising: false,
  clusteringDistance: undefined,
  maxZoom: undefined,
  height: 550
})

const appConfig = useAppConfig()
const pinStyleFunctions = appConfig?.ripple?.search?.mapPinStyleFn
const pinStyle = ref()
if (pinStyleFunctions && pinStyleFunctions.hasOwnProperty(props.pinIconFn)) {
  pinStyle.value = pinStyleFunctions[props.pinIconFn]
}

const mapRef = ref()

function getTitle(feature) {
  return get(feature, props.titleObjPath)
}

const features = computed(() => {
  return props.results.filter((itm) => itm.lat && itm.lng)
})
</script>

<style>
.tide-search-results-grid-item {
  display: flex;
}
</style>
