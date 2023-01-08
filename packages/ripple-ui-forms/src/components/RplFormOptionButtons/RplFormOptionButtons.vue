<script setup lang="ts">
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'

export interface Props {
  id: string
  name: string
  value: string
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
  disabled: false,
  variant: 'default',
  layout: 'block',
  perfectSquares: false,
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
