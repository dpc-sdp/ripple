<template>
  {{ formattedText }}
</template>

<script setup lang="ts">
interface Props {
  item: any
  column: any
}

const props = defineProps<Props>()

const formattedText = computed(() => {
  const rawValues = getSearchResultValue(
    props.item,
    props.column.objectKey,
    true
  )

  const formattedValues = (rawValues || []).map((rawValue: any[]) => {
    if (
      props.column.format === 'date' &&
      rawValue &&
      typeof rawValue === 'string'
    ) {
      return formatDate(rawValue)
    }

    return rawValue
  })

  return formattedValues.join(', ')
})
</script>
