<script setup lang="ts">
import { computed, useSlots } from 'vue'

const StatsGridVariants = ['onLight', 'onDark']

interface Props {
  variant?: (typeof StatsGridVariants)[number]
}

withDefaults(defineProps<Props>(), {
  variant: 'onLight'
})

const numItems = computed(() => {
  return useSlots().default()[0].children.length as number
})
</script>

<template>
  <dl
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
  </dl>
</template>

<style src="./RplStatsGrid.css" />
