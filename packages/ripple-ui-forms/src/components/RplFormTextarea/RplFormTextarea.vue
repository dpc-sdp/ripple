<script setup lang="ts">
import { computed } from 'vue'
import RplFormCounter from '../RplFormCounter/RplFormCounter.vue'

interface Props {
  id: string
  disabled?: boolean
  className: string
  value: string
  name: string
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

const classes = computed(() => {
  return {
    [`${props.className}`]: props.className,
    [`${props.className}--${props.variant}`]: true,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--invalid`]: props.invalid
  }
})

const isWordCounter = computed(() => props.counter === 'word')

/**
 * TODO - Wire up event bus handling
 */
// function handleInput(e: Event) {
//   props.handlers?.DOMInput(e)
// }
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
      :minlength="!isWordCounter ? minlength : null"
      :maxlength="!isWordCounter ? maxlength : null"
      class="rpl-u-focusable-outline"
      v-bind="$attrs"
      @blur="handlers?.blur"
      @input="handlers?.DOMInput"
    />
    <RplFormCounter
      v-if="counter"
      :value="value"
      :type="counter"
      :counter-min="counterMin"
      :counter-max="counterMax"
      :count-words="isWordCounter"
    />
  </div>
</template>

<style src="./RplFormTextarea.css"></style>
