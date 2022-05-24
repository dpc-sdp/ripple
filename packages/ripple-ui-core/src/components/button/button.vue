<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import {
  RplButtonTypes,
  RplButtonThemes,
  RplButtonIconPositions
} from './constants'
import { RplIconNames } from '../icon/constants'

import { PropType, computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { rplEventBus } from '../../index'
rplEventBus.register('rpl-button/click')

const props = defineProps({
  type: {
    type: String as PropType<typeof RplButtonTypes[number]>,
    default: 'filled'
  },
  theme: {
    type: String as PropType<typeof RplButtonThemes[number]>,
    default: 'core'
  },
  iconName: {
    type: [String, undefined] as PropType<
      typeof RplIconNames[number] | undefined
    >,
    default: undefined
  },
  iconPosition: {
    type: String as PropType<typeof RplButtonIconPositions[number]>,
    default: 'right'
  },
  label: {
    type: [String, undefined],
    required: false,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const directionClass = computed(() => {
  return props.iconPosition === 'left' ? 'rpl-button--reverse' : ''
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}
</script>

<template>
  <button
    type="button"
    :class="`rpl-button rpl-button--${type} rpl-button--${theme} ${directionClass}`"
    :disabled="disabled"
    @click="onClick()"
  >
    <span v-if="label" class="rpl-button__label">
      {{ label }}
    </span>
    <slot></slot>
    <span v-if="iconName" class="rpl-button__icon">
      <RplIcon :name="iconName"></RplIcon>
    </span>
  </button>
</template>

<style src="./button.css" />
