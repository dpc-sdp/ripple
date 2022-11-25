<script lang="ts">
export default { name: 'RplPaginationLink' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import { RplIconNames, RplIconPlacement, RplIconSizes } from '../icon/constants'

interface Props {
  iconName: typeof RplIconNames[number]
  iconSize: typeof RplIconSizes[number]
  iconPlacement?: RplIconPlacement
}

withDefaults(defineProps<Props>(), {
  iconSize: 's',
  iconPlacement: 'before'
})
</script>

<template>
  <button
    class="
      rpl-pagination__link rpl-pagination__link
      rpl-type-p rpl-u-focusable-inline
    "
  >
    <RplIcon
      v-if="iconPlacement === 'before'"
      :name="iconName"
      :size="iconSize"
      colour="default"
      class="rpl-pagination__link-icon"
    />
    <slot />
    <RplIcon
      v-if="iconPlacement === 'after'"
      :name="iconName"
      :size="iconSize"
      colour="default"
      class="rpl-pagination__link-icon"
    />
  </button>
</template>
