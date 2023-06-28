<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import RplFormCounter from '../RplFormCounter/RplFormCounter.vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

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
  minlength?: number
  maxlength?: number
  counter?: 'word' | 'character'
  counterMin?: number
  counterMax?: number
  variant?: 'default' | 'reverse'
  invalid?: boolean
  required?: boolean
  centeredText?: boolean
  globalEvents?: boolean
  onInput: (payload: Event) => void
  onBlur: (payload: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  className: 'rpl-form__input',
  value: undefined,
  label: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
  minlength: undefined,
  maxlength: undefined,
  counter: undefined,
  counterMin: undefined,
  counterMax: undefined,
  disabled: false,
  required: false,
  invalid: false,
  variant: 'default',
  centeredText: false,
  globalEvents: true,
  onInput: () => null,
  onBlur: () => null
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
    [`${props.className}--type-${props.type}`]: props.type,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--centered`]: props.centeredText,
    [`${props.className}--with-prefix-icon`]: props.prefixIcon,
    [`${props.className}--with-suffix-icon`]: props.suffixIcon,
    [`${props.className}--invalid`]: props.invalid
  }
})

const isWordCounter = computed(() => props.counter === 'word')

const handleChange = () => {
  emitRplEvent(
    'update',
    {
      action: 'exit',
      field: 'input',
      id: props.id,
      type: props.type,
      label: props?.label,
      value: props.value,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: props.globalEvents }
  )
}
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
        :minlength="!isWordCounter ? minlength : null"
        :maxlength="!isWordCounter ? maxlength : null"
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

<style src="./RplFormInput.css"></style>
