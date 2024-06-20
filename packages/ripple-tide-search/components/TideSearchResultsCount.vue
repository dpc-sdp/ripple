<template>
  <div data-component-type="search-listing-result-count">
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <RplSkeleton v-if="loading" width="s" class="rpl-type-label" />
      <p v-else-if="results?.length" class="rpl-type-label">
        Displaying {{ pagingStart }}-{{ pagingEnd }} of
        {{ totalResults }} results
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pagingStart: number
  pagingEnd: number
  totalResults: number
  loading?: boolean
  results?: any[]
}

withDefaults(defineProps<Props>(), {
  results: () => [],
  loading: false
})
</script>
