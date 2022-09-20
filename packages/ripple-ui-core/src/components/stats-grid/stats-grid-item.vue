<script lang="ts">
export default { name: 'RplStatsGridItem' }
</script>

<script setup lang="ts">
interface Props {
  value: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <li class="rpl-stats-grid-item">
    <span class="rpl-type-h3">{{ value }}</span>
    <span class="rpl-type-p">
      <slot></slot>
    </span>
  </li>
</template>

<style src="./stats-grid.css" />
