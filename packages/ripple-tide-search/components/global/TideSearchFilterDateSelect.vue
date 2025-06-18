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
    type="RplFormDateSelect"
    format="yyyy-MM-dd"
    :label="label"
    :pii="false"
  />
</template>
