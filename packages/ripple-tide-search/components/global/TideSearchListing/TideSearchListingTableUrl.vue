<template>
  <RplTextLink v-if="url" :url="url">{{ value }}</RplTextLink>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { computed, getSearchResultValue } from '#imports'

interface Props {
  item: any
  column: any
}

const props = defineProps<Props>()

const url = computed(() => {
  const result = getSearchResultValue(props.item, props.column.objectKey, true)
  return Array.isArray(result) ? result[0] : result
})

const value = computed(() => {
  if (props.column?.objectTextKey) {
    const result = getSearchResultValue(
      props.item,
      props.column.objectTextKey,
      true
    )
    return Array.isArray(result) ? result[0] : result
  }

  return url.value
})
</script>
