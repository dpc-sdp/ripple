<template>
  <div class="rpl-map-legend">
    <p class="rpl-map-legend__title rpl-type-h4-fixed">Legend</p>
    <ul class="rpl-type-list-ul">
      <slot></slot>
    </ul>
  </div>
</template>
<script setup lang="ts">
type LegendItems = {
  label: string
}
</script>

<style src="./RplMapLegend.css" />
