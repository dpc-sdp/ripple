<template>
  <div class="rpl-map-legend">
    <button
      type="button"
      class="rpl-map-legend__toggle rpl-type-label rpl-type-weight-bold rpl-u-focusable-inline"
      :aria-expanded="isExpanded"
      @click="handleToggle"
    >
      {{ title }}
      <RplIcon
        :name="isExpanded ? 'icon-chevron-up' : 'icon-chevron-down'"
        size="s"
        class="rpl-map-legend__toggle-icon"
      />
    </button>
    <RplExpandable :expanded="isExpanded">
      <ul class="rpl-map-legend__list">
        <RplMapLegendItem
          v-for="(item, index) in items"
          :key="index"
          :text="item.text"
          :icon="item.icon"
          :iconColour="item.iconColour"
        />
      </ul>
    </RplExpandable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RplExpandable, RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import RplMapLegendItem from './RplMapLegendItem.vue'

interface Props {
  title?: string
  defaultExpanded?: boolean
  items: {
    text: string
    icon: string
    iconColour: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Key',
  defaultExpanded: false
})

const isExpanded = ref(props.defaultExpanded)

const handleToggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style src="./RplMapLegend.css" />
