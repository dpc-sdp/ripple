<script lang="ts">
export default {
  name: 'RplIcon'
}
import coreIconKeys from './../../assets/icons/sprite.js'
import customIconImports from './../../assets/icons/custom.js'
export const RplCoreIconNames = coreIconKeys
export const RplCustomIconNames = Object.keys(customIconImports)
export const RplIconNames = [...RplCoreIconNames, ...RplCustomIconNames]
</script>

<script setup lang="ts">
import { PropType, ref, computed, defineAsyncComponent } from 'vue'
import type { RplTheme, RplIconSizes } from './../../types/ripple'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  theme: {
    type: [String, undefined] as PropType<RplTheme | undefined>,
    default: undefined
  },
  size: {
    type: String as PropType<RplIconSizes>,
    default: 's'
  },
  presentational: {
    type: Boolean,
    default: true
  }
})

const inSprite = ref(RplCoreIconNames.find((key) => key === props.name))
const asyncIcon = computed(() => {
  if (!inSprite.value) {
    return defineAsyncComponent(RplCustomIconNames[props.name])
  }
  return false
})
const classes = computed(() => [
  'rpl-icon',
  `rpl-icon--${props.name}`,
  `rpl-icon--theme-${props.theme}`,
  `rpl-icon--size-${props.size}`
])
</script>

<template>
  <component
    :is="asyncIcon"
    v-if="name && !inSprite && asyncIcon"
    :class="classes"
  />
  <svg v-else-if="name" :class="classes">
    <use :xlink:href="`#${name}`"></use>
  </svg>
  <slot v-else :class="classes"></slot>
</template>

<style>
@import './icon.css';
</style>
