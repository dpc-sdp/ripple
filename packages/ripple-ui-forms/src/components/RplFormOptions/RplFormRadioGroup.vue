<script setup lang="ts">
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import RplFormOption from './RplFormOption.vue'
import { inject } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

export interface RplFormRadioProps {
  id: string
  name: string
  value: string
  label?: string
  disabled?: boolean
  variant?: 'default' | 'reverse'
  layout?: 'block' | 'inline'
  onChange: (value: string) => void
  options: {
    id: string
    value: string
    label: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<RplFormRadioProps>(), {
  label: undefined,
  disabled: false,
  variant: 'default',
  layout: 'block',
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'select' }): void
}>()

const form: object = inject('form')
const { emitRplEvent } = useRippleEvent('rpl-form-radio-group', emit)

const handleChange = (selectedValue: string) => {
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', selectedValue)

  emitRplEvent(
    'update',
    {
      action: 'select',
      id: props.id,
      label: props?.label,
      value: selectedValue,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: true }
  )
}

const isChecked = (optionValue: string): boolean => {
  return props.value === optionValue
}
</script>

<template>
  <div :class="['rpl-form-radio-group', `rpl-form-radio-group--${layout}`]">
    <RplFormOption
      v-for="(option, i) in options"
      :id="`${id}-${option.id}`"
      :key="option.id"
      type="radio"
      :data-rpl-focus-input="i === 0 ? id : undefined"
      :variant="variant"
      :name="name"
      :label="option.label"
      :disabled="disabled || option.disabled"
      :checked="isChecked(option.value)"
      :global-events="false"
      @on-change="handleChange(option.value)"
    />
  </div>
</template>

<style src="./RplFormRadioGroup.css"></style>
