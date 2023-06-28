<script setup lang="ts">
import { computed, inject } from 'vue'
import RplFormCounter from '../RplFormCounter/RplFormCounter.vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  disabled?: boolean
  className?: string
  value?: string
  name: string
  label?: string
  rows?: number
  minlength?: number
  maxlength?: number
  invalid?: boolean
  required?: boolean
  counter?: 'word' | 'character'
  counterMin?: number
  counterMax?: number
  variant?: 'default' | 'reverse'
  handlers: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  className: 'rpl-form__textarea',
  rows: 4,
  value: undefined,
  label: undefined,
  minlength: undefined,
  maxlength: undefined,
  disabled: false,
  required: false,
  invalid: false,
  counter: undefined,
  counterMin: undefined,
  counterMax: undefined,
  variant: 'default'
})

const emit = defineEmits<{
  (e: 'update', payload: rplEventPayload & { action: 'exit' }): void
}>()

const form: object = inject('form')

const { emitRplEvent } = useRippleEvent('rpl-form-input', emit)

const classes = computed(() => {
  return {
    [`${props.className}`]: props.className,
    [`${props.className}--${props.variant}`]: true,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--invalid`]: props.invalid
  }
})

const handleChange = () => {
  emitRplEvent(
    'update',
    {
      action: 'exit',
      field: 'textarea',
      id: props.id,
      label: props?.label,
      value: props.value,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: true }
  )
}
</script>

<template>
  <div :class="classes">
    <textarea
      :id="id"
      :disabled="disabled"
      :required="required"
      :aria-required="required"
      :aria-invalid="invalid"
      :name="name"
      :value="value"
      :rows="rows"
      :minlength="minlength"
      :maxlength="maxlength"
      class="rpl-type-p rpl-u-focusable-outline"
      v-bind="$attrs"
      @blur="handlers?.blur"
      @input="handlers?.DOMInput"
      @change="handleChange"
    />
    <RplFormCounter
      v-if="counter"
      :value="value"
      :type="counter"
      :invalid="invalid"
      :counter-min="counterMin"
      :counter-max="counterMax"
    />
  </div>
</template>

<style src="./RplFormTextarea.css"></style>
