<template>
  <template v-if="popup.feature.length === 1">
    <div class="rpl-u-margin-t-4">
      <component
        :is="popupConfig.content.component"
        v-if="popupConfig.content.component"
        :feature="popup.feature[0]"
      ></component>
    </div>
  </template>

  <template v-if="popup.feature.length > 1">
    <RplMapPopUpAccordion :features="popup.feature" :getTitle="getTitle">
      <template #feature="{ feature }">
        <component
          :is="popupConfig.content.component"
          v-if="popupConfig.content.component"
          :feature="feature"
        ></component>
      </template>
    </RplMapPopUpAccordion>
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
