<script setup lang="ts">
import RplFormOption from './RplFormOption.vue'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'

interface Props {
  id: string
  value: string[]
  disabled?: boolean
  variant?: 'default' | 'reverse'
  onChange: (value: string[]) => void
  options: {
    id: string
    label: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'default',
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{ (e: 'onChange', value: string[]): void }>()

const handleToggle = (selectedId: string) => {
  let newValue

  if (!Array.isArray(props.value)) {
    // Value is empty, just create a new array
    newValue = [selectedId]
  } else if (props.value.includes(selectedId)) {
    // Value is already selected, so remove it from the list
    newValue = props.value.filter((existingOption) => {
      return existingOption !== selectedId
    })
  } else {
    // Value is not selected, so add it to the list
    newValue = [...props.value, selectedId]
  }

  // TODO - Wire up event bus handling here
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
}

const isChecked = (optionId: string): boolean => {
  return (props.value || []).includes(optionId)
}
</script>

<template>
  <div class="rpl-form-option-group">
    <RplFormOption
      v-for="(option, i) in options"
      :id="option.id"
      :key="option.id"
      type="checkbox"
      :data-rpl-focus-input="i === 0 ? id : undefined"
      :variant="variant"
      :name="option.id"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :checked="isChecked(option.id)"
      @on-change="handleToggle(option.id)"
    />
  </div>
</template>

<style src="./RplFormCheckboxGroup.css"></style>
