<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RplButtonElements,
  RplButtonVariants,
  RplButtonThemes,
  RplButtonIconPositions
} from './constants'
import { RplIconNames } from '../icon/constants'
import RplIcon from '../icon/icon.vue'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-button/click')
const emit = defineEmits(['click'])

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
  variant: 'filled',
  theme: 'default',
  iconName: undefined,
  iconPosition: 'right',
  label: undefined,
  disabled: false
})

const classes = computed(() => {
  const classTokens = [
    'rpl-button',
    `rpl-button--${props.variant}`,
    `rpl-button--${props.theme}`,
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

const link = ref(null)
const triggerClick = () => {
  link.value.click()
}

defineExpose({ triggerClick })
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
