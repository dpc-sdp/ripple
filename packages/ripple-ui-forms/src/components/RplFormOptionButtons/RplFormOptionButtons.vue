<script setup lang="ts">
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import { inject } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

export interface Props {
  id: string
  name: string
  value: string
  label?: string
  disabled?: boolean
  perfectSquares?: boolean
  onChange: (value: string) => void
  options: {
    id: string
    label: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  disabled: false,
  variant: 'default',
  layout: 'block',
  perfectSquares: false,
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'select' }): void
}>()

const form: object = inject('form')
const { emitRplEvent } = useRippleEvent('rpl-form-input', emit)

const handleChange = (selectedId: string) => {
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', selectedId)

  emitRplEvent(
    'update',
    {
      action: 'select',
      field: 'option-buttons',
      id: props.id,
      label: props?.label,
      value: selectedId,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: true }
  )
}

const isChecked = (optionId: string): boolean => {
  return props.value === optionId
}
</script>

<template>
  <div
    :class="{
      'rpl-form-opt-buttons': true,
      'rpl-form-opt-buttons--squares': props.perfectSquares
    }"
  >
    <div
      v-for="(option, i) in options"
      :key="option.id"
      class="rpl-form-opt-buttons-option"
    >
      <input
        :id="option.id"
        class="rpl-form-opt-buttons-option__input"
        type="radio"
        :data-rpl-focus-input="i === 0 ? id : undefined"
        :name="name"
        :disabled="disabled || option.disabled"
        :checked="isChecked(option.id)"
        @change="handleChange(option.id)"
      />
      <label
        class="rpl-form-opt-buttons-option__label rpl-type-label"
        :for="option.id"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<style src="./RplFormOptionButtons.css"></style>
