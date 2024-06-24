<template>
  <component :is="loading ? 'div' : 'section'">
    <RplResultListing
      v-if="displayResults.length"
      data-component-type="search-listing-layout-list"
      class="tide-search-result"
    >
      <RplResultListingItem
        v-for="(result, idx) in displayResults"
        :key="`result-${idx}-${result.id}`"
        data-component-type="search-result"
      >
        <component :is="result.component" v-bind="result.props" />
      </RplResultListingItem>
    </RplResultListing>
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
  skeleton: 'TideSearchResultSkeleton'
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
.tide-search-result {
  max-width: var(--rpl-content-max-width);
}
</style>
