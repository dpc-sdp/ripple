<script lang="ts">
export default {
  name: 'RplIcon'
}
import customIconImports from './../../assets/icons/custom.js'
</script>

<script setup lang="ts">
import { PropType, ref, computed, defineAsyncComponent } from 'vue'
import { RplIconSizes, RplCoreIconNames } from './constants'
import { RplColorThemes } from './../../lib/constants'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  theme: {
    type: [String, undefined] as PropType<
      typeof RplColorThemes[number] | undefined
    >,
    default: undefined
  },
  size: {
    type: String as PropType<typeof RplIconSizes[number]>,
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
    return defineAsyncComponent(customIconImports[props.name])
  }
  return false
})
const classes = computed(() => {
  const c = ['rpl-icon', `rpl-icon--size-${props.size}`]
  if (props.name) {
    c.push(`rpl-icon--${props.name}`)
  }
  if (props.theme) {
    c.push(`rpl-icon--theme-${props.theme}`)
  }
  return c
})
</script>

<template>
  <div :class="classes">
    <component :is="asyncIcon" v-if="name && !inSprite && asyncIcon" />
    <svg v-else-if="name">
      <use :xlink:href="`#${name}`"></use>
    </svg>
    <slot v-else></slot>
  </div>
</template>

<style>
@import './icon.css';
</style>
