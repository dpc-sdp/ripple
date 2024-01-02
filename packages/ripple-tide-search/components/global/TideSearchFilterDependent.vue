<script setup lang="ts">
import { getNode } from '@formkit/core'
interface Props {
  id: string
  placeholder: string
  multiple: boolean
  label: string
  options?: any[]
  timestamp?: string
}
const props = defineProps<Props>()

const parentOptions = computed(() => {
  return props.options?.filter((opt) => !opt.hasOwnProperty('parent'))
})
const childOptions = computed(() => {
  if (selectedParentCat.value) {
    const selectOption = props.options?.find(
      (opt) => opt.value === selectedParentCat.value
    )

    return props.options?.filter((opt) => opt.parent === selectOption.id)
  }
  return []
})

const selectedParentCat = ref(null)
let listener = ''

onMounted(() => {
  const formNode = getNode(`${props.id}-parent`)
  // Listen for any prop being set or changed.
  if (formNode) {
    listener = formNode.on('commit', ({ payload }) => {
      selectedParentCat.value = payload
    })
  }
})
onUnmounted(() => {
  const formNode = getNode(`${props.id}-parent`)
  // Listen for any prop being set or changed.
  if (formNode) {
    formNode.off(listener)
  }
})
</script>

<template>
  <div class="rpl-col-6-m">
    {{ selectedParentCat }}
    <FormKit
      :id="`${id}-parent`"
      :key="`${id}-${timestamp}-parent`"
      :name="`${id}-parent`"
      type="RplFormDropdown"
      :multiple="false"
      label="Category"
      :placeholder="placeholder"
      :options="parentOptions"
    />
  </div>
  <div class="rpl-col-6-m">
    <FormKit
      v-if="childOptions.length === 0"
      :disabled="true"
      :key="`${id}-${timestamp}-disabled`"
      type="RplFormDropdown"
      label="subcategory"
      placeholder="Select a category"
      :options="[]"
    />
    <FormKit
      v-else-if="selectedParentCat"
      :id="`${id}-child`"
      :key="`${id}-${timestamp}`"
      :name="`${id}-child`"
      type="RplFormDropdown"
      :multiple="multiple"
      label="subcategory"
      :placeholder="placeholder"
      :options="childOptions"
    />
  </div>
</template>
