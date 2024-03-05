<script setup lang="ts">
interface Props {
  id: string
  label: string
  timestamp?: string
  variant: 'default' | 'reverse'
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormDatePicker"
    :variant="variant"
    :label="label"
  />
</template>
