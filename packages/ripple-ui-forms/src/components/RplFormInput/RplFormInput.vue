<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

interface Props {
  id: string
  disabled?: boolean
  className?: string
  value?: string
  type?: string
  name: string
  label?: string
  prefixIcon?: string
  suffixIcon?: string
  min?: number
  max?: number
  minlength?: number
  maxlength?: number
  variant?: 'default' | 'reverse'
  invalid?: boolean
  required?: boolean
  centeredText?: boolean
  globalEvents?: boolean
  throttle?: number
  pii?: boolean
  onInput?: (payload: Event) => void
  onBlur?: (payload: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  className: 'rpl-form__input',
  value: undefined,
  label: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
  min: undefined,
  max: undefined,
  minlength: undefined,
  maxlength: undefined,
  disabled: false,
  required: false,
  invalid: false,
  variant: 'default',
  centeredText: false,
  globalEvents: true,
  throttle: 500,
  pii: true,
  onInput: () => null,
  onBlur: () => null
})

const emit = defineEmits<{
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-input', emit)

const form: object = inject('form')

const classes = computed(() => {
  return {
    [`${props.className}`]: props.className,
    [`${props.className}--${props.variant}`]: true,
    [`${props.className}--type-${props.type}`]: props.type,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--centered`]: props.centeredText,
    [`${props.className}--with-prefix-icon`]: props.prefixIcon,
    [`${props.className}--with-suffix-icon`]: props.suffixIcon,
    [`${props.className}--invalid`]: props.invalid
  }
})

const handleChange = useDebounceFn(() => {
  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      type: props.type,
      label: props?.label,
      contextId: form?.id,
      contextName: form?.name,
      value: sanitisePIIField(props.pii, props?.value)
    },
    { global: props.globalEvents }
  )
}, props.throttle)
</script>

<template>
  <div :class="classes">
    <div class="rpl-form__input-wrap">
      <RplIcon
        v-if="prefixIcon"
        :name="prefixIcon"
        :class="`${props.className}-icon ${props.className}-icon__prefix`"
        size="s"
      >
      </RplIcon>
      <input
        :id="id"
        :type="type"
        class="rpl-u-focusable-outline"
        :disabled="disabled"
        :required="required"
        :aria-required="required"
        :aria-invalid="invalid"
        v-bind="$attrs"
        :name="name"
        :value="value"
        :min="min"
        :max="max"
        :minlength="minlength"
        :maxlength="maxlength"
        @blur="onBlur"
        @input="onInput"
        @change="handleChange"
      />
      <RplIcon
        v-if="suffixIcon"
        :name="suffixIcon"
        :class="`${props.className}-icon ${props.className}-icon__suffix`"
        size="s"
      >
      </RplIcon>
    </div>
  </div>
</template>

<style src="./RplFormInput.css"></style>
