<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, ref, onMounted } from 'vue'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

export interface RplFormOptionProps {
  type?: 'radio' | 'checkbox'
  id: string
  label: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  variant?: 'default' | 'reverse'
  onChange?: (checked: boolean) => void
  onValue?: boolean | string | number
  offValue?: boolean | string | number
  showRequiredInLabel?: boolean
  globalEvents?: boolean
  grouped?: boolean
  pii?: boolean
}

const props = withDefaults(defineProps<RplFormOptionProps>(), {
  type: 'checkbox',
  disabled: false,
  required: false,
  checked: false,
  variant: 'default',
  onChange: () => undefined,
  onValue: true,
  offValue: false,
  showRequiredInLabel: false,
  globalEvents: true,
  grouped: false,
  pii: true
})

const emit = defineEmits<{
  (e: 'onChange', value: boolean): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const isMounted = ref(false)
const form: object = inject('form')
const { emitRplEvent } = useRippleEvent('rpl-form-option', emit)

const classes = computed(() => {
  return {
    'rpl-form-option': true,
    [`rpl-form-option--${props.variant}`]: props.variant,
    [`rpl-form-option--single`]: !props.grouped
  }
})

const handleChange = (e: Event) => {
  const el = e.target as HTMLInputElement
  const newValue = el.checked ? props.onValue : props.offValue

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)

  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      type: props.type,
      label: props?.label,
      value: sanitisePIIField(props.pii, newValue),
      contextId: form?.id,
      contextName: form?.name
    },
    { global: props.globalEvents }
  )
}

const isChecked = computed(() => {
  // We're waiting for mount before using the supplied checked prop
  // This is to get tests that check the initial checkbox state working in cypress
  return isMounted.value ? props.checked : false
})

onMounted(() => (isMounted.value = true))
</script>

<template>
  <div :class="classes">
    <input
      :id="id"
      :type="type"
      class="rpl-form-option__input"
      :disabled="disabled"
      :checked="isChecked"
      v-bind="$attrs"
      @change="handleChange"
    />
    <label class="rpl-form-option__label" :for="id">
      <span
        v-if="type === 'checkbox'"
        class="rpl-form-option__mark rpl-form-option__check"
      >
        <RplIcon
          class="rpl-form-option__mark-tick"
          name="icon-check"
          size="s"
        />
      </span>
      <span
        v-if="type === 'radio'"
        class="rpl-form-option__mark rpl-form-option__radio"
      >
        <span class="rpl-form-option__mark-tick rpl-form-option__radio-tick" />
      </span>
      <span class="rpl-form-option__label-text rpl-type-p">
        {{ label }}
        <span
          v-if="required && showRequiredInLabel"
          class="rpl-form-label__required rpl-type-label-small"
        >
          (Required)
        </span>
      </span>
    </label>
  </div>
</template>

<style src="./RplFormOption.css"></style>
