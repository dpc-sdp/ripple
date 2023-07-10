<template>
  <RplResultListing
    data-component-type="search-listing-layout-grid"
    class="rpl-grid"
  >
    <RplResultListingItem
      v-for="(result, idx) in results"
      :key="`result-${idx}-${result.id}`"
      class="rpl-col-12 rpl-col-4-m"
    >
      <component :is="result.component" v-bind="result.props" />
    </RplResultListingItem>
  </RplResultListing>
</template>

<script setup lang="ts">
import type { TideSearchListingResult } from './../../types'

interface Props {
  results: TideSearchListingResult[]
}

defineProps<Props>()
</script>
