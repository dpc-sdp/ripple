<template>
  <RplTag v-if="value" :label="value" :variant="variant" />
</template>

<script setup lang="ts">
interface Props {
  item: any
  column: any
  variant: 'default' | 'neutral' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const value = computed(() => {
  const result = getSearchResultValue(props.item, props.column.objectKey, true)
  return Array.isArray(result) ? result[0] : result
})
</script>
