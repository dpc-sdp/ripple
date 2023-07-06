<script setup lang="ts">
interface Props {
  id: string
  placeholder: string
  multiple: boolean
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
    :multiple="multiple"
    :label="label"
    :placeholder="placeholder"
    :options="options"
  />
</template>
