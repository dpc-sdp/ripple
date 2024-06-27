<script setup lang="ts">
interface Props {
  id: string
  label: string
  timestamp?: string | number
  variant: 'default' | 'reverse'
  layout?: 'block' | 'inline'
  options?: any[]
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormCheckboxGroup"
    :label="label"
    :variant="variant"
    :layout="layout"
    :options="options"
  />
</template>
