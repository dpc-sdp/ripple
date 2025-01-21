<script setup lang="ts">
interface Props {
  label?: string
  searchTerm: string
}

withDefaults(defineProps<Props>(), {
  label: 'Search results for'
})
</script>

<template>
  <h2 v-if="searchTerm" class="tide-search-results-heading rpl-type-h2">
    {{ label }} '{{ searchTerm }}'
  </h2>
</template>

<style>
.tide-search-results-heading {
  margin-bottom: var(--rpl-sp-4);
}
</style>
