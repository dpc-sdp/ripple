<script lang="ts">
export default { name: 'RplStatsGrid' }
</script>

<script setup lang="ts">
import { StatsGridVariants } from './constants'

interface Props {
  variant?: typeof StatsGridVariants[number]
}

withDefaults(defineProps<Props>(), {
  variant: 'onLight'
})
</script>

<template>
  <ul
    :class="{
      'rpl-stats-grid': true,
      'rpl-stats-grid--on-light': variant === 'onLight',
      'rpl-stats-grid--on-dark': variant === 'onDark'
    }"
  >
    <slot />
  </ul>
</template>

<style src="./stats-grid.css" />
