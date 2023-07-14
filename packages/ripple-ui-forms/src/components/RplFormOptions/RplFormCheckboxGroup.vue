<script setup lang="ts">
import RplFormOption from './RplFormOption.vue'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import { inject } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  value: string[]
  label?: string
  disabled?: boolean
  variant?: 'default' | 'reverse'
  onChange: (value: string[]) => void
  options: {
    id: string
    value: string
    label: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  disabled: false,
  variant: 'default',
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'select' }): void
}>()

const form: object = inject('form')
const { emitRplEvent } = useRippleEvent('rpl-form-checkbox-group', emit)

const handleToggle = (selectedValue: string) => {
  let newValue

  if (!Array.isArray(props.value)) {
    // Value is empty, just create a new array
    newValue = [selectedValue]
  } else if (props.value.includes(selectedValue)) {
    // Value is already selected, so remove it from the list
    newValue = props.value.filter((existingOption) => {
      return existingOption !== selectedValue
    })
  } else {
    // Value is not selected, so add it to the list
    newValue = [...props.value, selectedValue]
  }

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)

  emitRplEvent(
    'update',
    {
      action: 'select',
      id: props.id,
      label: props?.label,
      value: newValue,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: true }
  )
}

const isChecked = (optionValue: string): boolean => {
  return (props.value || []).includes(optionValue)
}
</script>

<template>
  <div class="rpl-form-option-group">
    <RplFormOption
      v-for="(option, i) in options"
      :id="`${id}-${option.id}`"
      :key="option.id"
      type="checkbox"
      :data-rpl-focus-input="i === 0 ? id : undefined"
      :variant="variant"
      :name="option.id"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :checked="isChecked(option.value)"
      :global-events="false"
      @on-change="handleToggle(option.value)"
    />
  </div>
</template>

<style src="./RplFormCheckboxGroup.css"></style>
