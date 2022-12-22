<script lang="ts">
export default { name: 'RplListContent' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import { RplIconNames, RplIconPlacement } from '../icon/constants'
import { RplColorThemes } from '../../lib/constants'

export interface Props {
  iconName?: typeof RplIconNames[number]
  iconColour?: typeof RplColorThemes[number]
  depth?: number
  iconPlacement?: RplIconPlacement
}

withDefaults(defineProps<Props>(), {
  iconName: undefined,
  iconColour: 'default',
  iconPlacement: 'before',
  depth: 0
})
</script>

<template>
  <span v-if="depth > 0" class="rpl-icon--child" />
  <RplIcon
    v-if="iconName && iconPlacement === 'before'"
    :name="iconName"
    :colour="iconColour"
    class="rpl-list__icon"
  />
  <span class="rpl-list__label">
    <slot />
  </span>
  <RplIcon
    v-if="iconName && iconPlacement === 'after'"
    :name="iconName"
    :colour="iconColour"
    class="rpl-list__icon"
  />
</template>
