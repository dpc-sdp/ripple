<script lang="ts">
export default { name: 'RplCard' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { RplCardElements, RplCardTypes } from './constants'

const props = defineProps({
  type: {
    type: String as PropType<typeof RplCardTypes[number]>,
    default: 'promo'
  },
  el: {
    type: String as PropType<typeof RplCardElements[number]>,
    default: 'div'
  },
  highlight: {
    type: Boolean,
    default: false
  }
})

const containerClasses = computed(() => {
  const classes = ['rpl-card', 'rpl-type-p']
  classes.push(`rpl-card--${props.type}`)
  return classes.join(' ')
})
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
    <slot name="lower"></slot>
  </component>
</template>

<style src="./card.css" />
