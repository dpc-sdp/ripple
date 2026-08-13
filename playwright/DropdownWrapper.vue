<script setup lang="ts">
import { ref } from 'vue'
import RplFormDropdown from '../packages/ripple-ui-forms/src/components/RplFormDropdown/RplFormDropdown.vue'

interface Props {
  id: string
  labelId: string
  placeholder: string
  multiple?: boolean
  searchable?: boolean
  clearSearchOnSelect?: boolean
  min?: string
  max?: string
  disabled?: boolean
  options?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  searchable: false,
  clearSearchOnSelect: false,
  disabled: false,
  options: () => [
    { id: 'apple', value: 'apple', label: 'Apple' },
    { id: 'banana', value: 'banana', label: 'Banana' },
    { id: 'orange', value: 'orange', label: 'Orange' },
    { id: 'strawberry', value: 'strawberry', label: 'Strawberry' },
    { id: 'apricots', value: 'apricots', label: 'Apricots' },
    { id: 'grapes', value: 'grapes', label: 'Grapes' },
    { id: 'pineapple', value: 'pineapple', label: 'Pineapple' },
    { id: 'sultana', value: 'sultana', label: 'Sultana' },
    { id: 'blueberries', value: 'blueberries', label: 'Blueberries' },
    { id: 'avocado', value: 'avocado', label: 'Avocado' },
    { id: 'peach', value: 'peach', label: 'Peach' },
    { id: 'lemon', value: 'lemon', label: 'Lemon' },
    { id: 'watermelon', value: 'watermelon', label: 'Watermelon' }
  ],
  min: undefined,
  max: undefined
})

const selectedValue = ref<string | string[] | undefined>()

const emit = defineEmits<{
  onChange: [value: any]
}>()

const handleChange = (value: string | string[]) => {
  selectedValue.value = value
  emit('onChange', value)
}
</script>

<template>
  <RplFormDropdown
    :id="id"
    :label-id="labelId"
    :placeholder="placeholder"
    :value="selectedValue"
    :multiple="multiple"
    :searchable="searchable"
    :clear-search-on-select="clearSearchOnSelect"
    :min="min"
    :max="max"
    :disabled="disabled"
    :options="options"
    @onChange="handleChange"
  />
</template>
