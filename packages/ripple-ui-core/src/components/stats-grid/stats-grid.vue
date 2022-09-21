<script lang="ts">
export default { name: 'RplStatsGrid' }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { StatsGridVariants } from './constants'

interface Props {
  variant?: typeof StatsGridVariants[number]
}

withDefaults(defineProps<Props>(), {
  variant: 'onLight'
})

const numItems = computed(() => {
  return useSlots().default()[0].children.length
})
</script>

<template>
  <ul
    :class="{
      'rpl-stats-grid': true,
      'rpl-stats-grid--on-light': variant === 'onLight',
      'rpl-stats-grid--on-dark': variant === 'onDark',
      'rpl-stats-grid--2-cols': numItems <= 4,
      'rpl-stats-grid--3-cols': numItems >= 5 && numItems <= 7,
      'rpl-stats-grid--4-cols': numItems >= 8
    }"
  >
    <slot />
  </ul>
</template>

<style src="./stats-grid.css" />
