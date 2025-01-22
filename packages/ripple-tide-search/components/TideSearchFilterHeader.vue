<script setup lang="ts">
interface Props {
  title?: string
  numAppliedFilters: number
}

withDefaults(defineProps<Props>(), {
  title: 'Filters'
})
</script>

<template>
  <h3 class="tide-search-filter-header rpl-type-h3-fixed">
    {{ title }}
    <span
      v-if="numAppliedFilters"
      class="tide-search-filter-header__selected rpl-type-label rpl-type-weight-regular"
    >
      {{ numAppliedFilters }} selected
    </span>
  </h3>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-filter-header {
  display: none;
  flex-wrap: wrap;
  align-items: center;
  column-gap: var(--rpl-sp-5);
  row-gap: var(--rpl-sp-1);
  padding-bottom: var(--rpl-sp-3);
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);

  @media (--rpl-bp-m) {
    display: flex;
  }
}
</style>
