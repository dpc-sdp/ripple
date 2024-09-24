<script setup lang="ts">
interface Props {
  id: string
  placeholder: string
  multiple: boolean
  label: string
  options?: any[]
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
    type="RplFormDropdown"
    :variant="variant"
    :multiple="multiple"
    :label="label"
    :placeholder="placeholder"
    :options="options"
    :pii="false"
  />
</template>
