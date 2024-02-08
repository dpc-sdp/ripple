<template>
  <p
    v-if="column?.label && hasValue"
    class="tide-search-listing-table-label-value__label"
  >
    <strong>{{ column.label }}</strong>
  </p>
  <p v-if="hasValue" class="tide-search-listing-table-label-value__value">
    <component
      :is="component"
      v-bind="props?.props"
      :item="item"
      :column="column"
    />
  </p>
</template>

<script setup lang="ts">
import { computed } from '#imports'

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

const hasValue = computed(() => props.item[props.column?.objectKey])
</script>
