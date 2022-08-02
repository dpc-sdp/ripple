<script lang="ts">
export default { name: 'RplCard' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { RplCardTypes } from './constants'

const props = defineProps({
  type: {
    type: String as PropType<typeof RplCardTypes[number]>,
    default: 'promo'
  },
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const clicked = function (e) {
  // go to url
}

const containerClasses = computed(() => {
  const classes = ['rpl-card', 'rpl-type-p']
  classes.push(`rpl-card--${props.type}`)
  return classes.join(' ')
})
</script>

<template>
  <div :class="containerClasses" @click="clicked">
    <div v-if="$slots.upper" class="rpl-card__upper">
      <slot name="upper"></slot>
    </div>
    <div class="rpl-card__body">
      <slot name="meta"></slot>
      <slot name="title"></slot>
      <slot></slot>
    </div>
    <slot name="lower"></slot>
  </div>
</template>

<style src="./card.css" />
