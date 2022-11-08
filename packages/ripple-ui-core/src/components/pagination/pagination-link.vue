<script lang="ts">
export default { name: 'RplPaginationLink' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import { RplIconNames, RplIconPlacement } from '../icon/constants'

interface Props {
  iconName: typeof RplIconNames[number]
  iconPlacement?: RplIconPlacement
}

withDefaults(defineProps<Props>(), {
  iconPlacement: 'before'
})
</script>

<template>
  <button
    class="
      rpl-pagination__link rpl-pagination__link
      rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline
    "
  >
    <RplIcon
      v-if="iconPlacement === 'before'"
      :name="iconName"
      colour="default"
      class="rpl-pagination__link-icon"
    />
    <slot />
    <RplIcon
      v-if="iconPlacement === 'after'"
      :name="iconName"
      colour="default"
      class="rpl-pagination__link-icon"
    />
  </button>
</template>
