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
import RplSpinner from '../spinner/spinner.vue'

rplEventBus.register('rpl-button/click')
const emit = defineEmits(['click'])
const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  buttonTheme: 'default'
})

interface Props {
  el?: (typeof RplButtonElements)[number]
  url?: string
  variant?: (typeof RplButtonVariants)[number]
  theme?: (typeof RplButtonThemes)[number]
  iconName?: (typeof RplIconNames)[number]
  iconPosition?: (typeof RplButtonIconPositions)[number]
  label?: string
  disabled?: boolean
  busy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  el: 'button',
  url: '',
  theme: undefined,
  variant: 'filled',
  iconName: undefined,
  iconPosition: 'right',
  label: undefined,
  disabled: false,
  busy: false
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
  return {
    'rpl-button': true,
    [`rpl-button--${props.variant}`]: true,
    [`rpl-button--${buttonTheme.value}`]: true,
    'rpl-u-focusable-block': true,
    'rpl-button--reverse': props.iconPosition === 'left',
    'rpl-button--busy': props.busy
  }
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
    :aria-busy="busy"
    @click="onClick"
  >
    <span v-if="busy" class="rpl-button__spinner"> <RplSpinner /></span>
    <span class="rpl-button__label rpl-type-label rpl-type-weight-bold">
      <template v-if="label">
        {{ label }}
      </template>
      <slot></slot>
    </span>
    <RplIcon
      v-if="iconName"
      :name="iconName"
      class="rpl-button__icon"
    ></RplIcon>
  </component>
</template>

<style src="./button.css" />
