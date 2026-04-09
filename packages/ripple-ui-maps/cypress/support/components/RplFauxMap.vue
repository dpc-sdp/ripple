<script setup lang="ts">
import { provide, ref } from 'vue'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core/vue'
import RplMap from '../../../src/components/map/RplMap.vue'
import RplMapPopUpAccordion from '../../../src/components/popup/RplMapPopUpAccordion.vue'
import RplMapProviderEsri from '../../../src/components/map/providers/RplMapProviderEsri.vue'
import RplMapProviderVicMap from '../../../src/components/map/providers/RplMapProviderVicMap.vue'
import ExampleVectorLayer from '../../../src/components/map/__fixture__/VectorLayer.example.vue'

interface Props {
  componentProps: any
}

const props = defineProps<Props>()

const rplMapRef = ref(null)
const popup = ref({
  isOpen: false,
  position: [0, 0],
  feature: null
})
const deadSpace = ref({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
})

function setRplMapRef(mapInstance) {
  rplMapRef.value = mapInstance
}

provide('rplMapInstance', {
  rplMapRef,
  setRplMapRef,
  popup,
  deadSpace
})

const getClusteredFeatures = (itms) => {
  return itms.map((itm, idx) => {
    return {
      id: `${idx}-${itm.title}`,
      title: itm.title,
      content: itm.description
    }
  })
}
</script>

<template>
  <RplIconSprite style="display: none" />
  <RplMap projection="EPSG:3857" v-bind="componentProps">
    <template #map-provider>
      <RplMapProviderEsri
        v-if="componentProps.provider === 'esri'"
        id="__rplfauxmapid"
      />
      <rpl-map-provider-vic-map v-if="componentProps.provider === 'vicmap'" />
    </template>
    <template v-if="componentProps.vectorLayers" #shapes="{ mapFeatures }">
      <ExampleVectorLayer :results="mapFeatures as any" />
    </template>
    <template #popupTitle="{ selectedFeatures }">
      <span v-if="selectedFeatures.length === 1">
        {{ selectedFeatures[0].title }}
      </span>
      <span v-else>
        {{ selectedFeatures.length }} items found in this area
      </span>
    </template>
    <template #popupContent="{ selectedFeatures }">
      <p
        v-if="selectedFeatures.length === 1"
        class="rpl-type-p-small rpl-u-margin-t-4"
      >
        {{ selectedFeatures[0].description }}
      </p>
      <RplMapPopUpAccordion
        v-else
        :features="getClusteredFeatures(selectedFeatures)"
        :getTitle="(f) => f.title"
      >
        <template #feature="{ feature }">
          <p class="rpl-type-p-small">{{ feature.content }}</p>
        </template>
      </RplMapPopUpAccordion>
    </template>
  </RplMap>
</template>
