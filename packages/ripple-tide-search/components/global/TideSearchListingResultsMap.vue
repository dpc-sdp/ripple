<template>
  <ClientOnly>
    <RplMap
      :id="123"
      ref="rplmap"
      :features="features"
      projection="EPSG:3857"
      :popupType="popupType"
      :map-height="550"
      :pinStyle="pinStyle"
      :noresults="noresults"
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
        <template v-if="selectedFeatures.length === 1">
          <div class="rpl-u-margin-t-4">
            <component
              :is="popup.content.component"
              v-if="popup.content.component"
              :feature="selectedFeatures[0]"
            ></component>
          </div>
        </template>

        <template v-if="selectedFeatures.length > 1">
          <RplMapPopUpAccordion :features="selectedFeatures">
            <template #feature="{ feature }">
              <component
                :is="popup.content.component"
                v-if="popup.content.component"
                :feature="feature"
              ></component>
            </template>
          </RplMapPopUpAccordion>
        </template>
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
  popupType: 'popover' | 'sidebar'
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
}

const props = withDefaults(defineProps<Props>(), {
  popupType: 'popover',
  titleObjPath: '_source.title[0]',
  vectorLayerComponent: undefined,
  pinIconFn: 'defaultPinStyleFn',
  legendTitle: 'Key',
  legendExpanded: false,
  legendItems: () => [],
  noresults: false
})

const appConfig = useAppConfig()
const pinStyleFunctions = appConfig?.ripple?.search?.mapPinStyleFn
const pinStyle = ref()
if (pinStyleFunctions && pinStyleFunctions.hasOwnProperty(props.pinIconFn)) {
  pinStyle.value = pinStyleFunctions[props.pinIconFn]
}

const rplmap = ref()

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
