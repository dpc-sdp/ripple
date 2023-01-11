<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { computed, ref, inject, Ref } from 'vue'
import {
  RplButtonElements,
  RplButtonVariants,
  RplButtonThemes,
  RplButtonIconPositions
} from './constants'
import { RplIconNames } from '../icon/constants'
import RplIcon from '../icon/icon.vue'
import { rplEventBus } from '../../index'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

rplEventBus.register('rpl-button/click')
const emit = defineEmits(['click'])
const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  buttonTheme: 'default'
})

interface Props {
  el?: typeof RplButtonElements[number]
  url?: string
  variant?: typeof RplButtonVariants[number]
  theme?: typeof RplButtonThemes[number]
  iconName?: typeof RplIconNames[number]
  iconPosition?: typeof RplButtonIconPositions[number]
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  el: 'button',
  url: '',
  theme: undefined,
  variant: 'filled',
  iconName: undefined,
  iconPosition: 'right',
  label: undefined,
  disabled: false
})

const buttonTheme = computed(() => {
  if (props.theme) {
    return props.theme
  } else if (featureFlags && featureFlags.hasOwnProperty('buttonTheme')) {
    return featureFlags['buttonTheme']
  }
  return 'default'
})

const classes = computed(() => {
  const classTokens = [
    'rpl-button',
    `rpl-button--${props.variant}`,
    `rpl-button--${buttonTheme.value}`,
    'rpl-u-focusable-block'
  ]
  if (props.iconPosition === 'left') {
    classTokens.push('rpl-button--reverse')
  }
  return classTokens
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
  emit('click', payload)
}

const link: Ref = ref(null)

defineExpose({ link })
</script>

<template>
  <component
    :is="el"
    ref="link"
    :href="el === 'a' ? url : null"
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="rpl-button__label rpl-type-label rpl-type-weight-bold">
      <template v-if="label">
        {{ label }}
      </template>
      <slot></slot>
    </span>
    <RplIcon v-if="iconName" :name="iconName"></RplIcon>
  </component>
</template>

<style src="./button.css" />
