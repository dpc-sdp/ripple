<script setup lang="ts">
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import RplFormOption from './RplFormOption.vue'

export interface RplFormRadioProps {
  id: string
  name: string
  value: string
  disabled?: boolean
  variant?: 'default' | 'reverse'
  layout?: 'block' | 'inline'
  onChange: (value: string[]) => void
  options: {
    id: string
    label: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<RplFormRadioProps>(), {
  disabled: false,
  variant: 'default',
  layout: 'block',
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{ (e: 'onChange', value: string[]): void }>()

const handleChange = (selectedId: string) => {
  // TODO - Wire up event bus handling here
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', selectedId)
}

const isChecked = (optionId: string): boolean => {
  return props.value === optionId
}
</script>

<template>
  <div :class="['rpl-form-radio-group', `rpl-form-radio-group--${layout}`]">
    <RplFormOption
      v-for="(option, i) in options"
      type="radio"
      :id="option.id"
      :key="option.id"
      :data-rpl-focus-input="i === 0 ? id : undefined"
      :variant="variant"
      :name="name"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :checked="isChecked(option.id)"
      @onChange="handleChange(option.id)"
    />
  </div>
</template>

<style src="./RplFormRadioGroup.css"></style>
