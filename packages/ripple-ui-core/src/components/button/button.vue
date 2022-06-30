<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { RplButtonVariants, RplButtonThemes } from './constants'
import { RplIconAndTextPositions } from '../global/constants'
import { RplIconNames } from '../icon/constants'
import RplIcon from '../icon/icon.vue'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-button/click')

const props = defineProps({
  variant: {
    type: String as PropType<typeof RplButtonVariants[number]>,
    default: 'filled'
  },
  theme: {
    type: String as PropType<typeof RplButtonThemes[number]>,
    default: 'primary'
  },
  iconName: {
    type: [String, undefined] as PropType<
      typeof RplIconNames[number] | undefined
    >,
    default: undefined
  },
  iconPosition: {
    type: String as PropType<typeof RplIconAndTextPositions[number]>,
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
  return props.iconPosition === 'left' ? ' rpl-icon-and-text--reverse' : ''
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}
</script>

<template>
  <button
    type="button"
    :class="`rpl-button rpl-button--${variant} rpl-button--${theme} rpl-u-focusable rpl-icon-and-text${directionClass}`"
    :disabled="disabled"
    @click="onClick()"
  >
    <span class="rpl-icon-and-text__label rpl-type-label rpl-type-weight-bold">
      <template v-if="label">
        {{ label }}
      </template>
      <slot></slot>
    </span>
    <span v-if="iconName" class="rpl-icon-and-text__icon">
      <RplIcon :name="iconName"></RplIcon>
    </span>
  </button>
</template>

<style src="./button.css" />
