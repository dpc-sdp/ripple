<template>
  <RplResultListing
    data-component-type="search-listing-layout-list"
    class="tide-search-result"
  >
    <RplResultListingItem
      v-for="(result, idx) in results"
      :key="`result-${idx}-${result.id}`"
    >
      <component :is="result.component" v-bind="result.props" />
    </RplResultListingItem>
  </RplResultListing>
</template>

<script setup lang="ts">
import type { TideSearchListingResultItem } from './../../types'

interface Props {
  results: TideSearchListingResultItem[]
}

defineProps<Props>()
</script>

<style>
.tide-search-result {
  max-width: var(--rpl-content-max-width);
}
</style>
