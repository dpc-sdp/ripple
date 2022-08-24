<script lang="ts">
export default { name: 'RplCard' }
</script>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue'
import { RplPropEl } from '../../lib/constants'
import { RplCardTypes } from './constants'

const props = defineProps({
  el: RplPropEl,
  type: {
    type: String as PropType<typeof RplCardTypes[number]>,
    default: 'promo'
  },
  highlight: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  active: false
})

const setActive = () => {
  state.active = true
}

const setInactive = () => {
  state.active = false
}

const containerClasses = computed(() => [
  'rpl-card',
  'rpl-type-p',
  `rpl-card--${props.type}`,
  state.active ? 'rpl-card--active' : null
])

defineExpose({ setActive, setInactive })
</script>

<template>
  <component :is="el" :class="containerClasses">
    <div v-if="highlight" class="rpl-card__highlight"></div>
    <div v-if="$slots.upper" class="rpl-card__upper">
      <slot name="upper"></slot>
    </div>
    <div class="rpl-card__body">
      <slot name="meta"></slot>
      <slot name="title"></slot>
      <div class="rpl-card__content">
        <slot></slot>
      </div>
    </div>
    <div v-if="$slots.lower" class="rpl-card__lower">
      <slot name="lower"></slot>
    </div>
  </component>
</template>

<style src="./card.css" />
