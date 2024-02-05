<template>
  <RplTextLink v-if="value" :url="`mailto:${value}`">{{ value }}</RplTextLink>
</template>

<script setup lang="ts">
interface Props {
  item: any
  column: any
}

const props = defineProps<Props>()

const value = computed(() => {
  const result = getSearchResultValue(props.item, props.column.objectKey, true)
  return Array.isArray(result) ? result[0] : result
})
</script>
