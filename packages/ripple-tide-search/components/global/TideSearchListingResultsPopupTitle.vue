<template>
  <span v-if="popup.feature?.length === 1">
    <component
      :is="popupConfig.title.component"
      v-if="popupConfig.title.component"
      :selectedFeature="popup.feature[0]"
    ></component>
    <span v-else>
      {{ getTitle(popup.feature[0]) }}
    </span>
  </span>
  <template v-if="popup.feature?.length > 1">
    {{ popup.feature.length }} items found in this area
  </template>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'

type TideSearchListingMapFeature = {
  lat: Number
  lng: Number
  id: string
}

interface Props {
  popupConfig: any
  features: TideSearchListingMapFeature[]
  titleObjPath: string
}

const props = withDefaults(defineProps<Props>(), {
  features: () => []
})

const { popup } = inject('rplMapInstance')

function getTitle(feature) {
  return get(feature, props.titleObjPath)
}
</script>
