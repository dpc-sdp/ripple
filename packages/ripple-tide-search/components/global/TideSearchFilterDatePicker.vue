<script setup lang="ts">
interface Props {
  id: string
  label: string
  timestamp?: string
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormDatePicker"
    :label="label"
  />
</template>
