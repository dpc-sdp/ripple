<script setup lang="ts">
interface Props {
  id: string
  label: string
  fromLabel?: string
  toLabel?: string
  timestamp?: string
  variant: 'default' | 'reverse'
  display?: 'inline' | 'block'
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormDateRange"
    :display="display"
    :variant="variant"
    :label="label"
    :fromLabel="fromLabel"
    :toLabel="toLabel"
    :pii="false"
  />
</template>
