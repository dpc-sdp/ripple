<script setup lang="ts">
import { provide, ref } from 'vue'
import RplMap from '../packages/ripple-ui-maps/src/components/map/RplMap.vue'
import RplMapPopUpAccordion from '../packages/ripple-ui-maps/src/components/popup/RplMapPopUpAccordion.vue'
import RplMapProviderVicMap from '../packages/ripple-ui-maps/src/components/map/providers/RplMapProviderVicMap.vue'
import RplMapProviderEsri from '../packages/ripple-ui-maps/src/components/map/providers/RplMapProviderEsri.vue'
import { RplIconSprite } from '../packages/ripple-ui-core/src/components'

interface Props {
  mapProps?: {
    features?: any[]
    projection?: string
    [key: string]: any
  }
  provider?: string
}

const props = withDefaults(defineProps<Props>(), {
  mapProps: () => ({
    projection: 'EPSG:3857'
  }),
  provider: 'vicmap'
})

// Set up the injection that RplMap needs
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

const defaultExtent: [number, number, number, number] = [
  15691021.8303, -4740581.4984, 16695098.6338, -4026353.9061
]

function setRplMapRef(mapInstance) {
  rplMapRef.value = mapInstance
}

provide('rplMapInstance', {
  rplMapRef,
  setRplMapRef,
  popup,
  deadSpace,
  defaultExtent
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
  <RplMap v-bind="mapProps as any">
    <template #map-provider>
      <RplMapProviderVicMap v-if="provider === 'vicmap'" id="vicmap" />
      <RplMapProviderEsri v-if="provider === 'esri'" id="esri" />
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
