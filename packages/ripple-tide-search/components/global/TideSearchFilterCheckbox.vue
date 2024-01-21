<script setup lang="ts">
interface Props {
  id: string
  label: string
  checkboxLabel: string
  onValue: string | number | boolean
  timestamp?: string | number
  variant: 'default' | 'reverse'
}
defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormCheckbox"
    :variant="variant"
    :label="label"
    :checkboxLabel="checkboxLabel"
    :onValue="onValue"
  />
</template>
