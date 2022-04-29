<script lang="ts">
export default {
  name: 'RplIcon'
}
</script>

<script setup lang="ts">
import { PropType, ref, computed, defineAsyncComponent } from 'vue'
import iconKeys from './../../assets/icons/sprite.js'
import customIcons from './../../assets/icons/custom.js'
import type { RplTheme, RplIconSizes } from './../../types/ripple'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  theme: {
    type: String as PropType<RplTheme>,
    default: 'core'
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

const inSprite = ref(iconKeys.find((key) => key === props.name))
const asyncIcon = computed(() => {
  if (!inSprite.value) {
    return defineAsyncComponent(customIcons[props.name])
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
