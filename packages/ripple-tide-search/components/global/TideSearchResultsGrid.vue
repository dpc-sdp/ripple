<template>
  <ul data-component-type="search-listing-layout-grid" class="rpl-grid">
    <li
      v-for="(result, idx) in results"
      :key="`result-${idx}-${result.id}`"
      class="tide-search-results-grid-item rpl-col-12 rpl-col-4-m"
    >
      <component :is="result.component" v-bind="result.props" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TideSearchListingResultItem } from './../../types'

interface Props {
  results: TideSearchListingResultItem[]
}

defineProps<Props>()
</script>

<style>
.tide-search-results-grid-item {
  display: flex;
}
</style>
