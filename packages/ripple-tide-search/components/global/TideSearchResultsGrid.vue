<template>
  <!-- We swap the element type here when loading has completed -->
  <!-- this was best way to ensure the results correctly replace skeleton screens in cypress -->
  <component :is="loading ? 'div' : 'section'">
    <ul
      v-if="displayResults.length"
      data-component-type="search-listing-layout-grid"
      class="rpl-grid"
    >
      <li
        v-for="(result, idx) in displayResults"
        :key="`result-${idx}-${result.id}`"
        data-component-type="search-result"
        class="tide-search-results-grid-item rpl-col-12 rpl-col-4-m"
      >
        <component :is="result.component" v-bind="result.props" />
      </li>
    </ul>
  </component>
</template>

<script setup lang="ts">
import type { TideSearchListingResultItem } from './../../types'

interface Props {
  results?: TideSearchListingResultItem[]
  perPage?: number
  loading?: boolean
  skeleton?: string
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  perPage: 10,
  loading: false,
  skeleton: 'TideSearchResultCardSkeleton'
})

const displayResults = computed(() => {
  if (props.loading) {
    return Array(props.perPage).fill({
      id: 'skeleton',
      component: props.skeleton
    })
  }

  return props.results?.length ? props.results : []
})
</script>

<style>
.tide-search-results-grid-item {
  display: flex;
}
</style>
