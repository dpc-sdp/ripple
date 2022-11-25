<script setup lang="ts">
import { computed } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'

export interface RplFormCheckboxProps {
  id: string
  label: string
  checked?: boolean
  disabled?: boolean
  variant?: 'default' | 'reverse'
  onChange: (checked: boolean) => void
  onValue?: boolean | string | number
  offValue?: boolean | string | number
}

const props = withDefaults(defineProps<RplFormCheckboxProps>(), {
  disabled: false,
  variant: 'default',
  onChange: () => undefined,
  onValue: true,
  offValue: true
})

const emit = defineEmits<{ (e: 'onChange', value: boolean): void }>()

const classes = computed(() => {
  return ['rpl-form-checkbox', `rpl-form-checkbox--${props.variant}`]
})

const handleChange = (e: Event) => {
  const el = e.target as HTMLInputElement
  const newValue = el.checked ? props.onValue : props.offValue

  // TODO - Wire up event bus handling here
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
}
</script>

<template>
  <div :class="classes">
    <input
      :id="id"
      type="checkbox"
      class="rpl-form-checkbox__input"
      :disabled="disabled"
      :checked="checked"
      @change="handleChange"
      v-bind="$attrs"
    />
    <label class="rpl-form-checkbox__label" :for="id">
      <span class="rpl-form-checkbox__box">
        <RplIcon
          class="rpl-form-checkbox__box-tick"
          name="icon-check"
          size="s"
        />
      </span>
      <span class="rpl-form-checkbox__label-text rpl-type-p">{{ label }}</span>
    </label>
  </div>
</template>

<style src="./RplFormCheckbox.css"></style>
