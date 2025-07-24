<script setup lang="ts">
defineProps<{
  orientation: 'row' | 'column'
  caption: string
  headingType: {
    horizontal: boolean
    vertical: boolean
  }
  columns: Array<string>
  items: Array<Array<string>>
}>()
</script>

<template>
  <RplDataTable
    :caption="caption"
    :headingType="headingType"
    :orientation="orientation"
    :columns="columns"
    :items="items"
  />
</template>
