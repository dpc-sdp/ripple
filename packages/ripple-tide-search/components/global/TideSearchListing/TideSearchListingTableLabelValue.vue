<template>
  <p v-if="column?.label" class="tide-search-listing-table-label-value__label">
    <strong>{{ column.label }}</strong>
  </p>
  <p class="tide-search-listing-table-label-value__value">
    <component
      :is="component"
      v-bind="props?.props"
      :item="item"
      :column="column"
    />
  </p>
</template>

<script setup lang="ts">
interface Props {
  item: any
  column: any
  component?: any
  props?: any
}

const props = withDefaults(defineProps<Props>(), {
  component: 'TideSearchListingTableValue',
  props: () => ({})
})
</script>
