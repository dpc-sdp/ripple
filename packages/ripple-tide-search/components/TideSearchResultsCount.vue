<template>
  <div data-component-type="search-listing-result-count">
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <RplSkeleton v-if="loading" width="s" class="rpl-type-label" />
      <p v-else-if="results?.length" class="rpl-type-label">
        Displaying {{ pagingStart }}-{{ pagingEnd }} of {{ totalResults
        }}{{ maxResultsExceededMarker }} results
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  pagingStart: number
  pagingEnd: number
  totalResults: number
  loading?: boolean
  results?: any[]
  maxResults?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  loading: false,
  maxResults: null
})

const maxResultsExceededMarker = computed(() => {
  if (!props.maxResults) {
    return ''
  }

  return props.totalResults >= props.maxResults ? '+' : ''
})
</script>
