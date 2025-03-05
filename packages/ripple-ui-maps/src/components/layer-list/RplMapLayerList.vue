<template>
  <div class="rpl-map-layer-list__trigger">
    <RplButton
      type="button"
      variant="elevated"
      theme="neutral"
      :aria-expanded="isOpen"
      @click="handleToggleClick"
    >
      {{ title }}
    </RplButton>
  </div>

  <RplMapPopUp :isOpen="isOpen" type="layerlist" @close="handleClose">
    <template #header>{{ title }}</template>
    <ul ref="content" class="rpl-map-layer-list">
      <li v-for="layer in layers" :key="layer.id">
        <button
          type="button"
          class="rpl-u-focusable-within"
          role="checkbox"
          :aria-checked="isLayerSelected(layer.id)"
          :class="{
            'rpl-map-layer-list-item': true,
            'rpl-map-layer-list-item--selected': isLayerSelected(layer.id)
          }"
          @click="handleToggleLayer(layer.id)"
        >
          <div
            class="rpl-map-layer-list-item__image-container rpl-u-focusable-outline--visible"
          >
            <div class="rpl-map-layer-list-item__image">
              <RplImage :src="layer.image" />
            </div>
            <RplIcon
              v-if="isLayerSelected(layer.id)"
              class="rpl-map-layer-list-item__image-icon"
              name="icon-cancel-circle-filled"
              size="xs"
            ></RplIcon>
          </div>
          <div
            class="rpl-map-layer-list-item__label rpl-type-p-small rpl-type-weight-bold rpl-u-focusable-inline"
          >
            {{ layer.label }}
          </div>
        </button>
      </li>
    </ul>
  </RplMapPopUp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IRplMapLayer } from './../../types'
import { RplIcon, RplImage } from '@dpc-sdp/ripple-ui-core/vue'
import RplMapPopUp from './../popup/RplMapPopUp.vue'

interface Props {
  title?: string
  layers?: IRplMapLayer[]
  selectedLayers?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Map layers',
  layers: () => [],
  selectedLayers: () => []
})

const emit = defineEmits<{
  update: [value: string[]]
}>()

const isOpen = ref<boolean>(false)

const handleToggleClick = () => {
  isOpen.value = !isOpen.value
}

const handleClose = () => {
  isOpen.value = false
}

const isLayerSelected = (layerId: string): boolean => {
  return (props.selectedLayers || []).includes(layerId)
}

const handleToggleLayer = (layerId: string) => {
  let newSelectedLayers = [...(props.selectedLayers || [])]
  if (newSelectedLayers.includes(layerId)) {
    newSelectedLayers = newSelectedLayers.filter((id) => id !== layerId)
  } else {
    newSelectedLayers = [...newSelectedLayers, layerId]
  }

  emit('update', newSelectedLayers)
}
</script>
<style src="./RplMapLayerList.css" />
