<template>
  <div
    data-component-type="search-listing-result-count"
    class="rpl-u-margin-t-8"
  >
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <p class="rpl-type-label rpl-u-padding-b-6">
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
}

defineProps<Props>()
</script>
