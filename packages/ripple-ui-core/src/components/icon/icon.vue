<script lang="ts">
export default {
  name: 'RplIcon'
}
export type RplTheme = 'core' | 'accent' | 'neutral'
export type RplIconSizes = 's' | 'm' | 'l'
</script>

<script setup lang="ts">
import { PropType, ref, computed, defineAsyncComponent } from 'vue'
import RplIconSprite from './sprite.vue'

const iconsKeys = RplIconSprite.iconNames

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  theme: {
    type: String as PropType<RplTheme>,
    default: 'core'
  },
  customIcon: {
    type: [Object, Boolean],
    default: false
  },
  size: {
    type: String as PropType<RplIconSizes>,
    default: 's'
  }
})

const inSprite = ref(iconsKeys.find((key) => key === props.name))
const asyncIcon = computed(() =>
  inSprite.value
    ? false
    : defineAsyncComponent(
        () => import(`./../../assets/icons/custom/${props.name}.svg?component`)
      )
)
const classes = computed(() => [
  `rpl-icon--${props.name}`,
  `rpl-icon--theme-${props.theme}`,
  `rpl-icon--size-${props.size}`
])
</script>

<template>
  <component
    :is="customIcon"
    v-if="!inSprite && customIcon"
    class="rpl-icon"
    :class="classes"
  >
  </component>
  <component
    :is="asyncIcon"
    v-else-if="!inSprite && asyncIcon"
    class="rpl-icon"
    :class="classes"
  >
  </component>
  <svg v-else class="rpl-icon" :class="classes" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style>
@import './icon.css';
</style>
