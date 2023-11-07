<template>
  <ClientOnly>
    <RplMap :id="123" :features="results" ref="rplmap">
      <template #map-provider>
        <rpl-map-provider-esri />
      </template>
      <template #popupTitle="{ selectedFeatures }">
        <span v-if="selectedFeatures.length === 1">
          <component
            :is="popup.title.component"
            v-if="popup.title.component"
            :selectedFeature="selectedFeatures[0]"
          ></component>
          <span v-else-if="popup.title.objKey">
            {{ selectedFeatures[0][popup.title.objKey] }}
          </span>
        </span>
        <template v-if="selectedFeatures.length > 1">
          {{ selectedFeatures.length }} items found in this area
        </template>
      </template>
      <template #popupContent="{ selectedFeatures }">
        <template v-if="selectedFeatures.length > 1">
          <RplAccordion :items="getClusteredFeatures(selectedFeatures)">
          </RplAccordion>
        </template>
        <template v-else-if="selectedFeatures.length === 1">
          <component
            :is="popup.content.component"
            v-if="popup.content.component"
            :selectedFeature="selectedFeatures[0]"
          ></component>
          <p v-else-if="popup.content.objKey">
            {{ selectedFeatures[0][popup.content.objKey] }}
          </p>
        </template>
      </template>
    </RplMap>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { TideSearchListingResultItem } from './../../types'

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
  results: TideSearchListingResultItem[]
}

const props = withDefaults(defineProps<Props>(), {
  latObjPath: '_source.lat[0]',
  lngObjPath: '_source.lng[0]',
  titleObjPath: '_source.title[0]'
})

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

onMounted(() => {
  console.log(rplmap.value)
})
</script>

<style>
.tide-search-results-grid-item {
  display: flex;
}
</style>
