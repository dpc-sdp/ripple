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
  const rawValue = getSearchResultValue(
    props.item,
    props.column.objectKey,
    true
  )

  if (!rawValue) {
    return ''
  }

  // Sometimes result fields are returned as an array, sometimes as a string.
  // We normalise to an array to make it easier to work with.
  const normalised = rawValue && Array.isArray(rawValue) ? rawValue : [rawValue]

  const formattedValues = normalised.map((rawValue: any[]) => {
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
