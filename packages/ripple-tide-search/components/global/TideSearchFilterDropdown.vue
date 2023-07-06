<script setup lang="ts">
interface Props {
  id: string
  field: string
  placeholder: string
  label: string
  options?: any[]
}
defineProps<Props>()
</script>

<template>
  <FormKit
    :id="id"
    :name="id"
    type="RplFormDropdown"
    :multiple="true"
    :label="label"
    :placeholder="placeholder"
    :options="options"
  />
</template>
