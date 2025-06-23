<script setup lang="ts">
interface Props {
  id: string
  label: string
  fromLabel?: string
  toLabel?: string
  timestamp?: string
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :key="`${id}-${timestamp}`"
    :name="id"
    type="RplFormDateSelectRange"
    :label="label"
    :fromLabel="fromLabel"
    :toLabel="toLabel"
    :pii="false"
  />
</template>
