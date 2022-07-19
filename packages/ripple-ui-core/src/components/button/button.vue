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

const classes = computed(() => {
  const classTokens = [
    'rpl-button',
    `rpl-button--${props.variant}`,
    `rpl-button--${props.theme}`,
    'rpl-u-focusable'
  ]
  if (props.iconPosition === 'left') {
    classTokens.push('rpl-button--reverse')
  }
  return classTokens.join(' ')
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="onClick()"
  >
    <span class="rpl-type-label rpl-type-weight-bold">
      <template v-if="label">
        {{ label }}
      </template>
      <slot></slot>
    </span>
    <RplIcon v-if="iconName" :name="iconName"></RplIcon>
  </button>
</template>

<style src="./button.css" />
