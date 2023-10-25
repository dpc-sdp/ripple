<script setup lang="ts">
import { ref, computed, inject, defineAsyncComponent } from 'vue'
import { RplIconSizes, RplCoreIconNames } from './constants'
import { RplColorThemes } from '../../lib/constants'
import customIconImports from './custom.js'

interface Props {
  name?: string
  colour?: (typeof RplColorThemes)[number]
  size?: (typeof RplIconSizes)[number]
  padded?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  colour: undefined,
  size: 's',
  padded: false,
  title: undefined
})

const inSprite = ref(RplCoreIconNames.find((key) => key === props.name))
const providedIcons = inject('rplIcons', {})

const asyncIcon = computed(() => {
  if (!inSprite.value) {
    try {
      return defineAsyncComponent(
        { ...customIconImports, ...providedIcons }[props.name]
      )
    } catch (e) {
      console.error(
        `RplIcon error: Couldn't dynamically import icon with name "${props.name}"`
      )
      return false
    }
  }
  return false
})

const classes = computed(() => [
  'rpl-icon',
  `rpl-icon--size-${props.size}`,
  props.name ? `rpl-icon--${props.name}` : null,
  props.colour ? `rpl-icon--colour-${props.colour}` : null,
  props.padded ? `rpl-icon--padded` : null
])
</script>

<template>
  <span :class="classes">
    <component :is="asyncIcon" v-if="name && !inSprite && asyncIcon" />
    <svg v-else-if="name" :role="title ? undefined : 'presentation'">
      <title v-if="title">{{ title }}</title>
      <use :xlink:href="`#${name}`"></use>
    </svg>
    <slot v-else></slot>
  </span>
</template>

<style>
@import './RplIcon.css';
</style>
