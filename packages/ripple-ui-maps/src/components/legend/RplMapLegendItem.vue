<script setup lang="ts">
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  text: string
  icon?: string
  iconColour?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconColour: undefined,
  icon: 'icon-pin'
})
</script>

<template>
  <li class="rpl-map-legend-item rpl-type-p-small">
    <RplIcon
      :name="icon"
      :colour="iconColour"
      size="s"
      class="rpl-map-legend-item__icon"
      :style="{
        color: iconColour
      }"
    />
    <span class="rpl-map-legend-item__label">
      {{ text }}
    </span>
  </li>
</template>
